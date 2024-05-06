import speech_recognition as sr
import pyttsx3
from ocr_ import ocr_text
import time
from text_to_speech import engToHindi


def wake_up_function():
    print("Wake-up keyword detected!")
    
    # print("Running")
    ocr_text('rasberry_pi/medicine3.jpg')
    
    # Your desired action goes here
    # For example, you can trigger an alarm, turn on lights, etc.

# Function to listen for the wake-up keyword
def listen_for_keyword():
    with sr.Microphone(device_index=15) as source:  # Replace YOUR_DEVICE_INDEX with the index of your USB microphone
        print("Listening for wake-up keyword...")
        try:
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.listen(source, timeout=5)  # Adjust timeout as needed
            
            text = recognizer.recognize_google(audio).lower()
            
        
            if 'camera' in text:
                engine.say("Camera is on. Please place the medicine in the given slot.")
                time.sleep(2)
                engine.runAndWait()
                wake_up_function()

            elif ('pinggy' or 'pingy' or 'pinky') in text:
                engine.say("Yes, how can I help you?")
                # time.sleep(1)
                engine.runAndWait()
            
            elif "lifestyle" in text:
                # text = getMedInfo("lifestyle")
                text1 = "Sure, here is the information about your lifestyle."
                text += text1
                engToHindi(text,"en")
                engine.say(text)
                # time.sleep(2)
                engine.runAndWait()

               
        except sr.UnknownValueError:
            # print("Could not understand audio")
            engine.say("Could you say it again?")
            # time.sleep(0.5)
            engine.runAndWait()

        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))
        except Exception as e:
            print("Error occurred: {0}".format(e))

# Main function to continuously listen for the wake-up keyword
def main():
    while True:
        listen_for_keyword()

if __name__ == "__main__":
    # Initialize the speech recognizer and text-to-speech engine
    recognizer = sr.Recognizer()
    engine = pyttsx3.init()
    main()
