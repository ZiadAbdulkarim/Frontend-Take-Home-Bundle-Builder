import cam4Image from '../assets/images/Wyze-Cam-v4.png'
import cam4BlackImage from '../assets/images/Wyze-Cam-v4(black).png'
import cam4WhiteImage from '../assets/images/Wyze-Cam-v4(white).png'
import cam4GreyImage from '../assets/images/Wyze-Cam-v4(Grey).png'
import doorbellImage from '../assets/images/Wyze-Duo-Cam-Doorbell.png'
import floodlightImage from '../assets/images/Wyze-Cam-Floodlight-v2.png'
import floodlightWhiteImage from '../assets/images/Wyze-Cam-Floodlight-v2(white).png'
import floodlightBlackImage from '../assets/images/Wyze-Cam-Floodlight-v2(black).png'
import panImage from '../assets/images/Wyze-Cam-Pan-v3.png'
import panWhiteImage from '../assets/images/Wyze-Cam-Pan-v3(white).png'
import panBlackImage from '../assets/images/Wyze-Cam-Pan-v3(black).png'
import batteryCamImage from '../assets/images/Wyze-Battery-Cam-Pro.png'
import batteryCamBlackImage from '../assets/images/Wyze-Battery-Cam-Pro(black).png'
import motionSensorImage from '../assets/images/Wyze-Sense-Motion-Sensor.png'
import senseHubImage from '../assets/images/Wyze-Sense-Hub-(Required).png'
import microSdImage from '../assets/images/Wyze-MicroSD-Card-(256GB).png'
import camUnlimitedImage from '../assets/images/Cam-Unlimited.png'

// Step order matches assignment: cameras → plan → sensors → accessories
export const bundleSteps = [
  {
    id: 'cameras',
    title: 'Choose your cameras',
    category: 'Cameras',
    products: [
      {
        id: 'wyze-cam-v4',
        name: 'Wyze Cam v4',
        description: 'The clearest Wyze Cam ever made.',
        price: 27.98,
        comparePrice: 35.98,
        badge: 'Save 22%',
        image: cam4Image,
        variants: [
          { id: 'wyze-cam-v4-white', label: 'White', swatch: '#FFFFFF', image: cam4WhiteImage },
          { id: 'wyze-cam-v4-grey', label: 'Grey', swatch: '#86898F', image: cam4GreyImage },
          { id: 'wyze-cam-v4-black', label: 'Black', swatch: '#181B20', image: cam4BlackImage },
        ],
      },
      {
        id: 'wyze-cam-pan-v3',
        name: 'Wyze Cam Pan v3',
        description: '360° pan and 180° tilt security camera.',
        price: 34.98,
        comparePrice: 39.98,
        badge: 'Save 12%',
        image: panImage,
        variants: [
          { id: 'wyze-cam-pan-v3-white', label: 'White', swatch: '#FFFFFF', image: panWhiteImage },
          { id: 'wyze-cam-pan-v3-black', label: 'Black', swatch: '#181B20', image: panBlackImage },
        ],
      },
      {
        id: 'wyze-cam-floodlight-v2',
        name: 'Wyze Cam Floodlight v2',
        description: '2K floodlight camera with a 160° wide-angle view for your garage.',
        price: 69.98,
        comparePrice: 89.98,
        badge: 'Save 22%',
        image: floodlightImage,
        variants: [
          { id: 'wyze-cam-floodlight-v2-white', label: 'White', swatch: '#FFFFFF', image: floodlightWhiteImage },
          { id: 'wyze-cam-floodlight-v2-black', label: 'Black', swatch: '#181B20', image: floodlightBlackImage },
        ],
      },
      {
        id: 'wyze-duo-cam-doorbell',
        name: 'Wyze Duo Cam Doorbell',
        description: 'Two cameras. Two views. Double the porch protection.',
        price: 69.98,
        image: doorbellImage,
      },
      {
        id: 'wyze-battery-cam-pro',
        name: 'Wyze Battery Cam Pro',
        description: 'Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.',
        price: 89.98,
        image: batteryCamImage,
        variants: [
          { id: 'wyze-battery-cam-pro-white', label: 'White', swatch: '#FFFFFF', image: batteryCamImage },
          { id: 'wyze-battery-cam-pro-black', label: 'Black', swatch: '#181B20', image: batteryCamBlackImage },
        ],
      },
    ],
  },
  {
    id: 'plan',
    title: 'Choose your plan',
    category: 'Plan',
    products: [
      {
        id: 'cam-unlimited',
        name: 'Cam Unlimited',
        description: 'Unlimited cameras, 14-day event storage, and smart AI detections.',
        price: 9.99,
        comparePrice: 12.99,
        badge: null,
        image: camUnlimitedImage,
        isPlan: true,
      },
    ],
  },
  {
    id: 'sensors',
    title: 'Choose your sensors',
    category: 'Sensors',
    products: [
      {
        id: 'wyze-sense-motion-sensor',
        name: 'Wyze Sense Motion Sensor',
        description: 'Detects motion from people & pets with customizable sensitivity.',
        price: 29.99,
        image: motionSensorImage,
      },
      {
        id: 'wyze-sense-hub',
        name: 'Wyze Sense Hub (Required)',
        description: 'Connects all sensors to your home network seamlessly.',
        price: 29.92,
        isFree: true,
        image: senseHubImage,
      },
    ],
  },
  {
    id: 'accessories',
    title: 'Add extra protection',
    category: 'Accessories',
    products: [
      {
        id: 'wyze-microsd-card-256gb',
        name: 'Wyze MicroSD Card (256GB)',
        description: 'Continuous 24/7 local recording storage for all Wyze cameras.',
        price: 20.98,
        image: microSdImage,
      },
    ],
  },
]

export function createInitialSelectionState() {
  return {
    activeStep: 0,
    quantities: {
      // Cameras — 1× Cam v4 (white) + 2× Cam Pan v3 (white) — matching Figma default
      'wyze-cam-v4-white': 1,
      'wyze-cam-pan-v3-white': 2,
      // Pre-populated sensors (no add-control per assignment spec)
      'wyze-sense-motion-sensor': 2,
      'wyze-sense-hub': 1,
      // Pre-populated accessories
      'wyze-microsd-card-256gb': 2,
      // Pre-populated plan
      'cam-unlimited': 1,
    },
    selectedVariants: {
      'wyze-cam-v4': 'wyze-cam-v4-white',
      'wyze-cam-pan-v3': 'wyze-cam-pan-v3-white',
      'wyze-cam-floodlight-v2': 'wyze-cam-floodlight-v2-white',
      'wyze-battery-cam-pro': 'wyze-battery-cam-pro-white',
    },
  }
}
