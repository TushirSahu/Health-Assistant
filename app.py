from flask import Flask, request, jsonify, render_template
from paddleocr import PaddleOCR
import cv2
import os
import preprocess
import numpy as np
import base64

app = Flask(__name__)

ocr = PaddleOCR(use_angle_cls=True, lang='en')

# UPLOAD_FOLDER = 'static'
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER




@app.route('/')
def upload_form():
    return render_template('index.html')

@app.route('/ocr', methods=['POST'])
def ocr_endpoint():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No selected file'})

    image_type = request.form['image_type']

  
    filename = os.path.join(app.config['UPLOAD_FOLDER'], image_file.filename)
    image_file.save(filename)

   
    img = cv2.imread(filename)

    img = preprocess.small_preprocess(img)
    # img = preprocess.preprocess(img)
    
    result = ocr.ocr(img, cls=True)
    num_texts = 0
    total_confidence = 0
    ocr_text = ''
    for data in result:
        for text_info in data:
            (read, confidence) = text_info[1]
            if confidence >= 0.60:
                ocr_text += read + ' '
                total_confidence += confidence
                num_texts += 1
    if num_texts > 0:
        total_confidence /= num_texts
    
    # annotated_ = category_folder + '/' + 'annotated_' + image_file.filename
    annotated_filename = os.path.join(app.config['UPLOAD_FOLDER'], 'annotated_' + image_file.filename)
    for data in result:
        for text_info in data:
            polygon = [tuple(map(int, point)) for point in text_info[0]]
            cv2.polylines(img, [np.array(polygon)], True, (255, 0, 0), 1)
    # cv2.imwrite(annotated_filename, img)
    os.remove(filename)
    return jsonify({'text': ocr_text, 'confidence': total_confidence})



if __name__ == '__main__':
    app.run(debug=True)


