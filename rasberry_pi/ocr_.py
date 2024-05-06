from paddleocr import PaddleOCR
import cv2
import os
import preprocess
import psutil
import numpy as np
from text_to_speech import engToHindi
from medInfo import getMedInfo
import pyaudio
import wave
import soundfile

def wav_writer(file_path):
    # file_path = "your_file.wav"
    data, samplerate = soundfile.read(file_path)
    soundfile.write(file_path, data, samplerate)
    with wave.open(file_path) as file:
        print('File writing done!')

def play_audio(file_path):
    CHUNK = 1024

    # Open the audio file
    wf = wave.open(file_path, 'rb')

    # Initialize PyAudio
    p = pyaudio.PyAudio()

    # Open a stream to play the audio
    stream = p.open(format=p.get_format_from_width(wf.getsampwidth()),
                    channels=wf.getnchannels(),
                    rate=wf.getframerate(),
                    output=True)

    # Read data in chunks and play
    data = wf.readframes(CHUNK)
    while data:
        stream.write(data)
        data = wf.readframes(CHUNK)

    # Close the stream and PyAudio
    stream.stop_stream()
    stream.close()
    p.terminate()

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
    if(getMedInfo(ocr_text) != ""): 
        engToHindi(getMedInfo(ocr_text),"hi")
        #integrate speaker
    # engToHindi((ocr_text),"hi")
    wav_writer(file_path='test.wav')
    mp3_file_path = "test.wav"  # Replace this with the path to your MP3 file
    play_audio(mp3_file_path)
    return 

    

    
    
    
    
    
    
    
    
    
    ocr_text1, accuracy = ocr_text('test.jpg')
    print(f"Text Detected {ocr_text1},Accuracy,{accuracy},%")
    print("OCR completed successfully.")
    print(process.memory_info().rss)  # in bytes