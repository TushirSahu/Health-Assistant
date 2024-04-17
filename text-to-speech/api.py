from gtts import gTTS 
from gemini.gemini import response
import os 
  

mytext = 'Welcome to geeksforgeeks!'
  
language = 'en'
  
myobj = gTTS(text=response, lang=language, slow=False) 
  
myobj.save("welcome.mp3") 

os.system("start welcome.mp3") 