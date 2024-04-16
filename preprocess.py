import cv2
import numpy as np
kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])

sharpen_kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])

custom_kernel_2 = np.array(
    [[0,0,-1,0,0],
    [0,-2,-3,-2,0],
    [-1,-3,25,-3,-1],
    [0,-2,-3,-2,0],
    [0,0,-1,0,0]]
)

def preprocess(image):
        image = cv2.resize(image, None, fx=3, fy=3, interpolation=cv2.INTER_NEAREST_EXACT) 
        image = cv2.filter2D(image, -1, kernel)
        image = cv2.GaussianBlur(image, (11, 11), 0)
        sharpened_image = cv2.filter2D(image, -1, custom_kernel_2)
        return sharpened_image

def small_preprocess(image):
    scale_percent = 200 
    width = int(image.shape[1] * scale_percent / 100)
    height = int(image.shape[0] * scale_percent / 100)
    dim = (width, height)

    image = cv2.resize(image, dim, interpolation = cv2.INTER_AREA)
    return image


def handwritten(image):
        image = cv2.resize(image, None, fx=3, fy=3, interpolation=cv2.INTER_NEAREST_EXACT) 
        image = cv2.filter2D(image, -1, kernel)
        image = cv2.GaussianBlur(image, (11, 11), 0)
        sharpened_image = cv2.filter2D(image, -1, custom_kernel_2)
        return sharpened_image


def traffic(image):
     image = cv2.filter2D(image, -1, custom_kernel_2)
     image = cv2.GaussianBlur(image, (9, 9), 0)
     return image