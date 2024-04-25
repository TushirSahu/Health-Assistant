from paddleocr import PaddleOCR
import cv2
import os
import preprocess
import psutil
import numpy as np

def ocr_text(image_path):
    ocr = PaddleOCR(use_angle_cls=True, lang='en')
    img = cv2.imread(image_path)

    img = preprocess.small_preprocess(img)
    
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
    
    for data in result:
        for text_info in data:
            polygon = [tuple(map(int, point)) for point in text_info[0]]
            cv2.polylines(img, [np.array(polygon)], True, (255, 0, 0), 1)
    # cv2.imwrite(annotated_filename, img)

    # os.remove(image_path) 
    return ocr_text, total_confidence


if __name__=="__main__":
    process = psutil.Process()
    
    ocr_text1, accuracy = ocr_text('download.jpg')
    print(f"Text Detected {ocr_text1},Accuracy,{accuracy},%")
    print("OCR completed successfully.")
    print(process.memory_info().rss)  # in bytes

