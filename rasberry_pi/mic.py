import speech_recognition as sr

def list_microphones():
    print("Available Microphones:")
    for index, name in enumerate(sr.Microphone.list_microphone_names()):
        print(f"Index {index}: {name}")

if __name__ == "__main__":
    list_microphones()
