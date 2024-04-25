# import required module 
import speech_recognition as sr 
from os import path 
from pydub import AudioSegment 
# from audio_converter2wav import AudioConverter2Wav
# import subprocess
# import pydub
import soundfile
import wave

r = sr.Recognizer()
def wav_writer(file_path):
    # file_path = "your_file.wav"
    data, samplerate = soundfile.read(file_path)
    soundfile.write(file_path, data, samplerate)
    with wave.open(file_path) as file:
        print('File writing done!')


def startConvertion(path = 'welcome1.wav',lang = 'hi-IN'):
    with sr.AudioFile(path) as source:
        print('Fetching File')
        audio_text = r.listen(source)
        # recoginize_() method will throw a request error if the API is unreachable, hence using exception handling
        try:
        
            # using google speech recognition
            print('Converting audio transcripts into text ...')
            text = r.recognize_google(audio_text)
            print(text)
    
        except:
            print('Sorry.. run again...')

wav_writer(file_path='welcome1.wav')
startConvertion()
