import client1 from "./assets/client-1.jpeg";
import client2 from "./assets/client-2.jpeg";
import client3 from "./assets/client-3.jpeg";
import client4 from "./assets/client-4.jpeg";
import client5 from "./assets/client-5.jpeg";
import { IoMdAnalytics} from "react-icons/io";
import { IoCallOutline ,IoLocationOutline } from "react-icons/io5";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineSupportAgent,MdOutlineAlternateEmail } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";
import { FaInstagram, FaXTwitter, FaYoutube,FaLaptopCode} from "react-icons/fa6";
import { FaFacebookSquare,FaPaintBrush } from "react-icons/fa";
import { TfiWrite } from 'react-icons/tfi'
import {DiReact} from "react-icons/di";
import {FaNodeJs} from "react-icons/fa";
import {SiExpress,SiMongodb} from "react-icons/si";
import { CgFigma } from "react-icons/cg";
import { TbBrandReactNative } from "react-icons/tb";
import { SiAdobexd } from "react-icons/si";
import { TiHtml5 } from "react-icons/ti";
import { FaCss3Alt } from "react-icons/fa6";
import { RiJavascriptFill } from "react-icons/ri";
import { FaJava } from "react-icons/fa6";
import { TbFileTypeXml } from "react-icons/tb";
import { FaVolleyball } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa";

export const tabs = [
    {name:"About Me",id:'about'},
    {name:"Skill",id:'skill'},
    {name:"Services",id:'services'},
    {name:"Projects",id:'projects'},
    {name:"Testimonials",id:'testimonials'},
]

export const whyChooseMe = [
  {
    title:"Unmatched Local Expertise",
    icon:<GrUserExpert/>,
    link:"",
  },
  {
    title:"Comprehensive Market Analysise",
    icon:<IoMdAnalytics/>,
    link:"",
  },
  {
    title:"Dedicated Client Support",
    icon:<MdOutlineSupportAgent/>,
    link:"",
  },
  {
    title:"Innovative Marketing Strategies",
    icon:<RiExchange2Fill/>,
    link:"",
  },
]
export const services = [
  {
    name:"UI/UX Design",
    icon:<FaPaintBrush/>,
    description:`Design intuitive interfaces and captivating visuals to elevate digital experiences. Leverage creativity and skill to enhance user engagement, satisfaction, and interaction. Focus on optimizing usability and delivering exceptional, user-centered solutions.`,
  },
  {
    name:"Web Development",
    icon:<FaLaptopCode/>,
    description:`Utilize front-end and back-end expertise to create complete web solutions. Focus on ensuring a smooth and seamless user experience by integrating both design and functionality for a cohesive and efficient digital presence.`,
  },
  {
    name:"Content Creation",
    icon:<TfiWrite/>,
    description:`Employ both creativity and strategy in content creation to craft compelling and engaging material. Focus on producing high-quality content that resonates with the audience, enhances brand presence, and drives meaningful engagement.`,
  },
  
]


export const skills = [
  {
      title:"UI/UX",
      data:[
          {
              skill:"Figma",
              level:"Experienced",
          },
          {
              skill:"Sketch",
              level:"Intermediate",
          },
          {
              skill:"XD",
              level:"Intermediate",
          },
      ]
  },
  {
      title:"Frontend Development",
      data:[
          {
              skill:"HTML",
              level:"Experienced",
          },
          {
              skill:"CSS",
              level:"Experienced",
          },
          {
              skill:"JavaScript",
              level:"Experienced",
          },
          {
              skill:"Tailwind",
              level:"Intermediate",
          },
          {
              skill:"Bootstrap",
              level:"Experienced",
          },
          {
              skill:"React",
              level:"Experienced",
          },
          {
              skill:"React Native",
              level:"Experienced",
          },
      ]
  },
  {
      title:"Backend Development",
      data:[
          {
              skill:"Node JS",
              level:"Experienced",
          },
          {
              skill:"MangoDB",
              level:"Intermediate",
          },
          {
              skill:"PHP",
              level:"Experienced",
          },
          {
              skill:"Python",
              level:"Intermediate",
          },
          {
              skill:"MySQL",
              level:"Experienced",
          },
      ]
  },
]

import React, { useState, useEffect } from 'react';

export const projects = [
  {
    id: 1,
    title: 'Static Portfolio Website',
    image: 'https://i.ibb.co/WVjS5Fx/1696927528936.jpg',
    category: 'Web',
    description: `A personal portfolio website showcasing my skills, projects, and experience.
                  Built with a focus on design and smooth animations using GSAP.`,
    demoLink: 'https://itzmejanak.github.io/my_best_Project/',
    stack: [
      {
        name: 'HTML',
        icon: <TiHtml5 />,
        iconColor: 'orange',
      },
      {
        name: 'CSS',
        icon: <FaCss3Alt />,
        iconColor: 'blue',
      },
      {
        name: 'JavaScript',
        icon: <RiJavascriptFill />,
        iconColor: 'yellow',
      },
      {
        name: 'GSAP',
        icon: <FaGooglePlay />,
        iconColor: 'green',
      }
    ]
  },
  {
    id: 2,
    title: 'E-Commerce Application',
    image: 'https://i.ibb.co/DMySgG0/photo-collage-png.png',
    category: 'Web',
    description: `An online store featuring a user-friendly interface, product catalog, 
                  and shopping cart functionality. Optimized for performance and scalability.`,
    demoLink: 'https://dainty-figolla-15a769.netlify.app/html/home',
    stack: [
      {
        name: 'HTML',
        icon: <TiHtml5 />,
        iconColor: 'orange',
      },
      {
        name: 'CSS',
        icon: <FaCss3Alt />,
        iconColor: 'blue',
      },
      {
        name: 'JavaScript',
        icon: <RiJavascriptFill />,
        iconColor: 'yellow',
      }
    ]
  },
  {
    id: 3,
    title: 'Last Projects',
    image: 'https://i.ibb.co/kyKZXxP/1708631345443.jpg',
    category: 'Web',
    description: `A collection of my most recent projects, highlighting my growth and expertise 
                  in web development.`,
    demoLink: 'https://itzmejanak.github.io/my_best_Project/#portfolio',
    stack: [
      {
        name: 'HTML',
        icon: <TiHtml5 />,
        iconColor: 'orange',
      },
      {
        name: 'CSS',
        icon: <FaCss3Alt />,
        iconColor: 'blue',
      },
      {
        name: 'JavaScript',
        icon: <RiJavascriptFill />,
        iconColor: 'yellow',
      }
    ]
  },
  
  {
    id: 4,
    title: 'Weather App',
    image: 'https://i.ibb.co/WpkkDgp/Screenshot-2024-08-12-125722.png',
    category: 'UI/UX',
    description: `A clean and intuitive design for a weather app, showcasing the forecast with engaging visuals.`,
    demoLink: 'https://github.com/itzmejanak/Android-Studio/blob/main/Android%20Studio/_00_Learnings/_00_Diagrams/Adobe/WeatherApp.xd',
    stack: [
      {
        name: 'XD',
        icon: <SiAdobexd />,
        iconColor: 'skyblue',
      }
    ]
  },
  {
    id: 5,
    title: 'Music App',
    image: 'https://i.ibb.co/5Ln3QnH/Screenshot-2024-08-12-130622.png',
    category: 'UI/UX',
    description: `A modern and sleek music app design, optimized for user experience and easy navigation.`,
    demoLink: 'https://github.com/itzmejanak/Android-Studio/blob/main/Android%20Studio/_00_Learnings/_00_Diagrams/Adobe/_03_Music_Player.xd',
    stack: [
      {
        name: 'XD',
        icon: <SiAdobexd />,
        iconColor: 'skyblue',
      }
    ]
  },

  {
    id: 6,
    title: 'Music App',
    image: 'https://i.ibb.co/42HjSrs/1719171800036.jpg',
    category: 'Apps',
    description: `An advanced music application featuring a sleek design and smooth playback, built using Java and XML.`,
    demoLink: 'https://github.com/itzmejanak/Android-Studio/tree/main/Android%20Studio/_01_Projects/_05_MusicApp/MusicPlus',
    stack: [
      {
        name: 'Java',
        icon: <FaJava />, 
        iconColor: 'orange',
      },
      {
        name: 'XML',
        icon: <TbFileTypeXml />,  
        iconColor: 'blue',
      }
    ]
  },
  {
    id: 7,
    title: 'Weather App',
    image: 'https://i.ibb.co/QrCVhT4/1719238975432.jpg',
    category: 'Apps',
    description: `A real-time weather application utilizing the Volley library for network requests, crafted with Java and XML.`,
    demoLink: 'https://github.com/itzmejanak/Android-Studio/tree/main/Android%20Studio/_01_Projects/_07_WeatherApp',
    stack: [
      {
        name: 'Java',
        icon: <FaJava />, 
        iconColor: 'orange',
      },
      {
        name: 'XML',
        icon: <TbFileTypeXml />,
        iconColor: 'blue',
      },
      {
        name: 'Volley Library',
        icon: <FaVolleyball />,  
        iconColor: 'red',
      }
    ]
  },
  {
    id: 8,
    title: 'Calculator App',
    image: 'https://i.ibb.co/8jsRx8j/Screenshot-2024-08-12-131619.png',
    category: 'Apps',
    description: `A basic yet functional calculator application, developed with Java and XML for Android devices.`,
    demoLink: 'https://github.com/itzmejanak/Android-Studio/tree/main/Android%20Studio/_01_Projects/_03_Calculator',
    stack: [
      {
        name: 'Java',
        icon: <FaJava />,  
        iconColor: 'orange',
      },
      {
        name: 'XML',
        icon: <TbFileTypeXml />,
        iconColor: 'blue',
      }
    ]
  },

]

export const clients = [
  {
    image:client1,
    name:'Samuel Eze',
    review:` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
           veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
           veniam, quis nostrud exercitation ullamco laborisveniam, quis nostrud 
           exercitation ullamco laboris`
  },
  {
    image:client2,
    name:'Richael Linda',
    review:` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
           veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea`
  },
  {
    image:client3,
    name:'Gloria Chiwendu',
    review:` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
           veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
           veniam, quis nostrud exercitation ullamco laborisveniam, quis nostrud 
           exercitation ullamco laborisveniam, quis nostrud exercitation ullamco laboris`
  },
  {
    image:client4,
    name:'Precious Stone',
    review:` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
           veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea`
  },
  {
    image:client5,
    name:'Ndubisi John',
    review:` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
           veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea`
  },

];

export const contactOptions = [
  {
    title:"Email",
    value:"itzmejanak@gmail.com",
    icon:<MdOutlineAlternateEmail />,
  },
  {
    title:"Phone Number",
    value:"+977-9866214494",
    icon:<IoCallOutline/>,
  },
  {
    title:"Address",
    value:"Nepal, Gandaki, Pokhara",
    icon:<IoLocationOutline/>,
  },
]

export const socialHandles = [
    {
      name:"Instagram",
      icon:<FaInstagram />,
      link:"",
    },
    {
      name:"Facebook",
      icon:<FaFacebookSquare/>,
      link:"",
    },
    {
      name:"Twitter",
      icon:<FaXTwitter/>,
      link:"",
    },
    {
      name:"Youtube",
      icon:<FaYoutube/>,
      link:"https://www.youtube.com/channel/UCEtnsPZQEd0l1tbr_nDQd5Q?sub_confirmation=1",
    },
];

export const footer = [
  {
    title:"Explore",
    routes:[
      {name:"Apps",id:'apps'},
      {name:"ChatGPT4o",id:'chatgpt4o'},
      {name:"E-Books",id:'e-book'},
      {name:"SourceCode",id:'source-code'},
    ]
  },
  {
      title:"Trusted",
      routes:[
        {name:"Services",id:'services'},
        {name:"Projects",id:'projects'},
        {name:"Testimonials",id:'testimonials'},
      ]
    },
  {
      title:"Others",
      routes:[
        {name:"Privacy Policy"},
        {name:"Terms and Conditions"},
        {name:"Cookie Policy"},
      ]
    },
]


export const appData = [
  {
    "id": 1,
    "imgSrc": "https://cdn4.iconfinder.com/data/icons/files-47/64/apk-512.png",
    "title": "AI Photo Enhancer",
    "description": "Photo enhancement tool",
    "details": "Enhances photos with AI algorithms.",
    "link": "https://www.mediafire.com/file/fw7eq8ckqfwzw2v/AI_Photo_Enhancer_3.4.1_kill.apk/file",
    "category": "Editor"
  },
  {
    "id": 2,
    "imgSrc": "https://cdn4.iconfinder.com/data/icons/files-47/64/apk-512.png",
    "title": "Autodesk SketchBook",
    "description": "Sketching and drawing app",
    "details": "Professional-grade sketching tools.",
    "link": "https://www.mediafire.com/file/9jjdky5421hw3py/Autodesk_SketchBook_5.1.5.apk/file",
    "category": "Editor"
  },
  {
    "id": 3,
    "imgSrc": "https://cdn4.iconfinder.com/data/icons/files-47/64/apk-512.png",
    "title": "GenZArt",
    "description": "Art creation app",
    "details": "Create and edit digital art easily.",
    "link": "https://www.mediafire.com/file/kofijdlqhmcgwia/GenZArt_4.3.1_sign.apk/file",
    "category": "Editor"
  },
  {
    "id": 4,
    "imgSrc": "https://cdn4.iconfinder.com/data/icons/files-47/64/apk-512.png",
    "title": "Photify AI",
    "description": "AI photo editing app",
    "details": "AI-powered photo enhancements.",
    "link": "https://www.mediafire.com/file/0sxde8mhisvlw1t/Photify_AI_1.1.3.apk/file",
    "category": "Editor"
  },
  {
    "id": 5,
    "imgSrc": "https://cdn4.iconfinder.com/data/icons/files-47/64/apk-512.png",
    "title": "PixelLeap",
    "description": "Pixel art editor",
    "details": "Create and edit pixel art graphics.",
    "link": "https://www.mediafire.com/file/dx66j4qhm12fzzs/PixelLeap.apk/file",
    "category": "Editor"
  },
  {
    "id": 6,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/8108/8108760.png",
    "title": "Oto Music",
    "description": "Music player app",
    "details": "Play and manage your music collection.",
    "link": "https://www.mediafire.com/file/w7gj6yhobqp4hrs/Oto_Music_3.9.5_kill.apk/file",
    "category": "Music"
  },
  {
    "id": 7,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/8108/8108760.png",
    "title": "PLAYit",
    "description": "Media player app",
    "details": "Play videos and music with ease.",
    "link": "https://www.mediafire.com/file/l4lsqvyvdffq6de/PLAYit_2.7.7.12.apk/file",
    "category": "Music"
  },

  {
    "id": 8,
    "imgSrc": "https://securitygladiators.com/wp-content/uploads/16.APK-File-Image.jpg",
    "title": "Anti Spy",
    "description": "Spyware removal tool",
    "details": "Detects and removes spyware and malware.",
    "link": "https://www.mediafire.com/file/hde11zj6l4z78as/Anti_Spy_6.0.4_sign%25282%2529.apk/file",
    "category": "Optimization"
  },
  {
    "id": 9,
    "imgSrc": "https://securitygladiators.com/wp-content/uploads/16.APK-File-Image.jpg",
    "title": "Avast Cleanup",
    "description": "System cleaning app",
    "details": "Cleans junk files and optimizes performance.",
    "link": "https://www.mediafire.com/file/g54kt4ieueezk76/Avast_Cleanup_24.01.0.apk/file",
    "category": "Optimization"
  },
  {
    "id": 10,
    "imgSrc": "https://securitygladiators.com/wp-content/uploads/16.APK-File-Image.jpg",
    "title": "Battery Guru",
    "description": "Battery management app",
    "details": "Monitors and optimizes battery usage.",
    "link": "https://www.mediafire.com/file/navkg07yjwzluh9/Battery_Guru_2.2.5.2%25282%2529.apk/file",
    "category": "Optimization"
  },
  {
    "id": 11,
    "imgSrc": "https://securitygladiators.com/wp-content/uploads/16.APK-File-Image.jpg",
    "title": "mod Edit",
    "description": "Mod editing tool",
    "details": "Edit and modify application mods.",
    "link": "https://www.mediafire.com/file/wqggbvk55yz38jy/mod_Edit_sign_sign.apk/file",
    "category": "Optimization"
  },
  {
    "id": 12,
    "imgSrc": "https://securitygladiators.com/wp-content/uploads/16.APK-File-Image.jpg",
    "title": "Voice Changer - Audio Effects",
    "description": "Audio effects app",
    "details": "Change and customize audio effects.",
    "link": "https://www.mediafire.com/file/x3euomgjrqwe7b1/Voice_Changer_-_Audio_Effects_1.5.8_sign.apk/file",
    "category": "Optimization"
  },
  {
    "id": 13,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "Antivirus AI",
    "description": "AI-based antivirus",
    "details": "AI-powered protection against viruses.",
    "link": "https://www.mediafire.com/file/euwn55ttckpbcj2/Antivirus_AI_2.0.5_sign.apk/file",
    "category": "Personalization"
  },
  {
    "id": 14,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "Flow Launcher",
    "description": "Custom launcher app",
    "details": "Personalize and manage your device's home screen.",
    "link": "https://www.mediafire.com/file/ysym9pr9sq749w9/Flow_Launcher_18.3.apk/file",
    "category": "Personalization"
  },

  {
    "id": 15,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "Hyperion",
    "description": "Custom launcher app",
    "details": "Highly customizable launcher with various themes.",
    "link": "https://www.mediafire.com/file/7yxyxjlsnipvuvt/hyperion_2.0.52.apk/file",
    "category": "Personalization"
  },
  {
    "id": 16,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "Love Launcher",
    "description": "Themed launcher app",
    "details": "Beautiful and romantic themes for your home screen.",
    "link": "https://www.mediafire.com/file/htfc1kymk4j91fe/Love_Launcher_4.3.1_sign.apk/file",
    "category": "Personalization"
  },
  {
    "id": 17,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "Muviz Edge",
    "description": "Edge lighting app",
    "details": "Customizable edge lighting effects for your device.",
    "link": "https://www.mediafire.com/file/3bw4f0e9x29a70d/Muviz_Edge_1.9.1.0.apk/file",
    "category": "Personalization"
  },
  {
    "id": 18,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "NewLook Launcher",
    "description": "Launcher with fresh look",
    "details": "A launcher with a modern and clean interface.",
    "link": "https://www.mediafire.com/file/scrpe4xiyyycmto/NewLook_Launcher_4.0.apk/file",
    "category": "Personalization"
  },
  {
    "id": 19,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "Niagara Launcher",
    "description": "Minimalist launcher",
    "details": "Streamlined launcher with an easy-to-use interface.",
    "link": "https://www.mediafire.com/file/g6zayz18c9s93wd/Niagara_Launcher_1.9.5.apk/file",
    "category": "Personalization"
  },
  {
    "id": 20,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/9646/9646083.png",
    "title": "CCleaner",
    "description": "System cleaning tool",
    "details": "Optimizes and cleans up your device.",
    "link": "https://www.mediafire.com/file/6orxtj47np2daaa/CCleaner_23.22.0.apk/file",
    "category": "Productivity"
  },
  {
    "id": 21,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/9646/9646083.png",
    "title": "ES File Explorer",
    "description": "File management app",
    "details": "Manage and organize files on your device.",
    "link": "https://www.mediafire.com/file/fbl9fp4ku4btd3n/ES_File_Explorer_4.4.0.2.1.apk/file",
    "category": "Productivity"
  },
  {
    "id": 22,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/9646/9646083.png",
    "title": "File Manager",
    "description": "Efficient file management",
    "details": "Manage and organize files with ease.",
    "link": "https://www.mediafire.com/file/8djlkzvzab8ymvl/File_manager.apk/file",
    "category": "Productivity"
  },
  {
    "id": 23,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/9646/9646083.png",
    "title": "HabitNow",
    "description": "Habit tracking app",
    "details": "Track and build positive habits effectively.",
    "link": "https://www.mediafire.com/file/sdvgcat47fl8rif/HabitNow_2.1.8.apk/file",
    "category": "Productivity"
  },
  {
    "id": 24,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/9646/9646083.png",
    "title": "iLovePDF",
    "description": "PDF management tool",
    "details": "Edit, merge, and convert PDF files.",
    "link": "https://www.mediafire.com/file/6yvdjjiio2dov5t/iLovePDF_3.6.2_sign.apk/file",
    "category": "Productivity"
  },
  {
    "id": 25,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/9646/9646083.png",
    "title": "My Diary",
    "description": "Digital diary app",
    "details": "Keep track of your thoughts and notes.",
    "link": "https://www.mediafire.com/file/vfrauburfzicsnb/My_Diary_1.03.29.0204.apk/file",
    "category": "Productivity"
  },
  {
    "id": 26,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/9646/9646083.png",
    "title": "To-do List",
    "description": "Task management tool",
    "details": "Organize and track your tasks and to-dos.",
    "link": "https://www.mediafire.com/file/5kh5es6rd5cpw3a/To-do_List_1.02.38.1212.apk/file",
    "category": "Productivity"
  },
  {
    "id": 27,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/9646/9646083.png",
    "title": "WPS Office Lite",
    "description": "Office suite",
    "details": "Compact office suite for document editing.",
    "link": "https://www.mediafire.com/file/ajjfqzfvdolv1e6/WPS_Office_lite.apk/file",
    "category": "Productivity"
  },
  {
    "id": 28,
    "imgSrc": "https://static.vecteezy.com/system/resources/previews/015/426/286/large_2x/apk-file-format-icon-apk-extension-filled-icon-free-vector.jpg",
    "title": "Programming Hub",
    "description": "Coding learning platform",
    "details": "Learn and practice various programming languages.",
    "link": "https://www.mediafire.com/file/ko2qc4zvsabk310/Programming_Hub.apk/file",
    "category": "Study"
  },
  {
    "id": 29,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "1.1.1.1",
    "description": "Secure DNS resolver",
    "details": "Enhance your privacy with a fast and secure DNS resolver.",
    "link": "https://www.mediafire.com/file/uaer6g0w17vwe7s/1.1.1.1_6.32_sign.apk/file",
    "category": "Tools"
  },
  {
    "id": 30,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "All Document Reader Offline",
    "description": "Offline document reader",
    "details": "Read various document formats without an internet connection.",
    "link": "https://www.mediafire.com/file/hnkrqytn64bwx05/All_Document_Reader_Offline_2.6.apk/file",
    "category": "Tools"
  },
  {
    "id": 31,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "AntiSplit VIP",
    "description": "File splitter tool",
    "details": "Split large files into smaller parts and merge them back.",
    "link": "https://www.mediafire.com/file/z0l3deilehxo9fn/AntiSplit_VIP_1.0.apk/file",
    "category": "Tools"
  },
  {
    "id": 32,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "Developer Assistant",
    "description": "Development tools",
    "details": "Access various tools and utilities for developers.",
    "link": "https://www.mediafire.com/file/qaw2gkbbad51b0b/Developer_Assistant_1.2.2.apk/file",
    "category": "Tools"
  },
  {
    "id": 33,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "Equalizer",
    "description": "Audio equalizer",
    "details": "Adjust the audio settings for a better listening experience.",
    "link": "https://www.mediafire.com/file/biyn5ia2e7wv894/Equalizer_4.9.7.apk/file",
    "category": "Tools"
  },
  {
    "id": 34,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "IAS.cmd",
    "description": "Command-line tool",
    "details": "Run command-line operations and scripts efficiently.",
    "link": "https://www.mediafire.com/file/jpeyu2an7nwqds1/IAS.cmd/file",
    "category": "Tools"
  },
  {
    "id": 35,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "Latest",
    "description": "Latest updates",
    "details": "Stay updated with the latest news and features.",
    "link": "https://www.mediafire.com/file/f8aabvmzdn1j4cl/Latest.apk/file",
    "category": "Tools"
  },
  {
    "id": 36,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "Mobile Firewall",
    "description": "Firewall protection",
    "details": "Protect your mobile device from unauthorized access.",
    "link": "https://www.mediafire.com/file/kcj3je39k3vw21r/Mobile_Firewall_1.1.10.apk/file",
    "category": "Tools"
  },
  {
    "id": 37,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "NetShare",
    "description": "Network sharing",
    "details": "Share your internet connection with other devices.",
    "link": "https://www.mediafire.com/file/a8nq8jqp1v325uw/NetShare_2.25.apk/file",
    "category": "Tools"
  },
  {
    "id": 38,
    "imgSrc": "https://cdn3d.iconscout.com/3d/free/thumb/free-apk-file-10134904-8248663.png?f=webp",
    "title": "Text Extractor",
    "description": "Extract text from images",
    "details": "Convert images containing text into editable text format.",
    "link": "https://www.mediafire.com/file/javua1x3y4knjwe/Text_Extractor_1.5.7_kill_sign.apk/file",
    "category": "Tools"
  },
  {
    "id": 39,
    "imgSrc": "https://static.vecteezy.com/system/resources/previews/015/426/286/large_2x/apk-file-format-icon-apk-extension-filled-icon-free-vector.jpg",
    "title": "GPT Notes",
    "description": "Direct Integration",
    "details": "A useful app for taking and organizing notes with GPT.",
    "link": "https://www.mediafire.com/file/pwco5mb62uz3gee/GPT_Notes_3.5.0.0.apk/file",
    "category": "Study"
  },
  {
    "id": 40,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "CalWi",
    "description": "Direct Integration",
    "details": "Customize your calendar with this app.",
    "link": "https://www.mediafire.com/file/2s9uty16pk4qhpc/CalWi_2.13.apk/file",
    "category": "Personalization"
  },
  {
    "id": 41,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "OS Widgets",
    "description": "Direct Integration",
    "details": "Add OS-style widgets to your Android device.",
    "link": "https://www.mediafire.com/file/nczh1949r43a0ar/OS_Widgets_v4.0.0%25284000030%2529_antisplit_sign.apk/file",
    "category": "Personalization"
  },
  {
    "id": 42,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/10234/10234578.png",
    "title": "Digital Clock Live Wallpaper & AOD",
    "description": "Direct Integration",
    "details": "A digital clock with live wallpaper and Always On Display.",
    "link": "https://www.mediafire.com/file/8pxiny1oyfthzz7/Digital_Clock_Live_Wallpaper_%2526_AOD_9.0.apk/file",
    "category": "Personalization"
  },
  {
    "id": 43,
    "imgSrc": "https://cdn-icons-png.flaticon.com/512/8108/8108760.png",
    "title": "XPlayer - Video Player",
    "description": "Direct Integration",
    "details": "A powerful video player with support for all formats.",
    "link": "https://www.mediafire.com/file/oe80s280kc2fv97/XPlayer_-_Video_Player_2.3.9.1.apk/file",
    "category": "Music"
  },
];



export const pdfData = [
  {
    "imgSrc": "https://www.red-gate.com/simple-talk/wp-content/uploads/2020/02/word-image-6.png",
    "altText": "Disk Management PDF",
    "discount": "Linux",
    "itemName": "Disk Management",
    "oldPrice": "N/A",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/p0fcm4hlfl0m999b9o3jh/Disk-Management_Module-8.pdf?rlkey=l2r1tk381fzfuayf4kvh179l4&st=cyr0bszi&dl=0",
    "category": "Linux"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/4Tf1r-V-N9qikF-c9tqIZma0HUSSWFyXQ3JS1A5ouFc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/Lzcxb0xiWmI3NXdM/LmpwZw",
    "altText": "Linux Fundamentals PDF",
    "discount": "Linux",
    "itemName": "Linux Fundamentals",
    "oldPrice": "N/A",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/1755fmqoo8g2ke88z86du/Linux-fundamentals_Module-4.pdf?rlkey=m51ao6l201ong47lnws7q6f14&st=mpfbav9z&dl=0",
    "category": "Linux"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/qLffSlCphvGX2PC6uawvdJotpx1vNlT1ZjFOADKowaI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z3VydTk5LmNvbS9p/bWFnZXMvMS9MaW51/eC1jb3ZlcnBhZ2Uu/anBn",
    "altText": "The Basic PDF",
    "discount": "Linux",
    "itemName": "Linux Fundamentals: The Basic",
    "oldPrice": "N/A",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/ahsfx37jt5ca99j5pcs8o/Linux-fundamentals_The_Basic_Module-1.pdf?rlkey=a3wtgjpdofcj7e8q1lozunmir&st=ouyxo9qh&dl=0",
    "category": "Linux"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/WkHCpsft_mM5rDlDD0b5M5YKlEO6qa7nG_3SC5inOgQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxMTZNbVM4bnBM/LmpwZw",
    "altText": "Linux Cookbook PDF",
    "discount": "Linux",
    "itemName": "Linux Cookbook",
    "oldPrice": "N/A",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/8rykkogfj3y29stnn5fit/Linux_CookBook.pdf?rlkey=oqpeb9j5mifeeek7cr7h3kicb&st=ztabmoeb&dl=0",
    "category": "Linux"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/XkNm2QfJ7FTl0rzDsYlDSdeT6E3CwZPXe_uLSrDrfYk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bWFnYXppbmVzLnRv/cC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8xMi9Db21wdXRl/ci1OZXR3b3JraW5n/LUJpYmxlLTMtaW4t/MS1UaGUtQ29tcGxl/dGUtQ3Jhc2gtQ291/cnNlLXRvLUVmZmVj/dGl2ZWx5LURlc2ln/bi1JbXBsZW1lbnQt/TWFuYWdlLndlYnA",
    "altText": "Networking Full Crash Course PDF",
    "discount": "Linux",
    "itemName": "Networking Full Crash Course",
    "oldPrice": "N/A",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/sis3j1atdxwfxxt78euv5/Networking_Full_Crash_Course_Module-6.pdf?rlkey=hkhp7klpkvepck5u4mkutpd9u&st=ma0zdaej&dl=0",
    "category": "Linux"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/vHKC7U7epIuR9jPAdZDtltCGHA_NdcrqpYGNgehxpJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzQxa1hCa3QxM1pM/LmpwZw",
    "altText": "Shell Scripting PDF",
    "discount": "Linux",
    "itemName": "Shell Scripting",
    "oldPrice": "N/A",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/g2kfy5gskzic5uq616w9f/Shell-scripting_Module-7.pdf?rlkey=ni2c0mbdumuw604dc5sgs7itp&st=zx7bgwak&dl=0",
    "category": "Linux"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/C3f9ygAvLsrBlbrH5Too91K2aC9_q0z_7Rxw9WGJQJY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDE2NGdCVWtXc0wu/anBn",
    "altText": "System Access and File System PDF",
    "discount": "Linux",
    "itemName": "System Access and File System",
    "oldPrice": "N/A",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/alwypzn64jl20sfbafitz/System-Access-and-File-System_Module-3.pdf?rlkey=sbu52oemzsx2bznvq0yt8q6rc&st=nymvolln&dl=0",
    "category": "Linux"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/uZpMdDbB_OF8xh5VgUsUy4et2mrXYM9mAdC3644QYjk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxWnNDMGVqSThM/LmpwZw",
    "altText": "System Administration PDF",
    "discount": "Linux",
    "itemName": "System Administration",
    "oldPrice": "N/A",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/o29uk7i5ujie74vsj17rz/System-Administration_Module-5.pdf?rlkey=t1xepfqc5bj5y3p2kf5dpsoqs&st=4dalc2ir&dl=0",
    "category": "Linux"
  },

  {
    "imgSrc": "https://imgs.search.brave.com/L4Hmntyz-8GztJOgNa9zgeY6mb37qasMe10zOJXYheE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxNjdhYVZ4czNM/LmpwZw",
    "altText": "8 Week Java image",
    "discount": "Java",
    "itemName": "8 Week Java",
    "oldPrice": "$15.00",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/9f5vtha5uhqhylq05lldt/8-week-java.pdf?rlkey=u0brziknfqot7phkoh7tx493u&st=r54knhkg&dl=0",
    "category": "Java"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/Y84TOjLvi0qfxlmRQ8KIUI491sm1Uc_CDyxMuH61ffU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/cGVybGVnby5jb20v/Ym9va3MvUk1fQm9v/a3MvcGFja3RfcHVi/X3ZwbmNrd2VnLzk3/ODE3ODk4MDA1MDBf/MzAwXzQ1MC53ZWJw",
    "altText": "1000 Java Problems image",
    "discount": "Java",
    "itemName": "1000 Java Problems",
    "oldPrice": "$18.00",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/vuztdtu3p1ko2wysothuv/1000-Java-Problems.pdf?rlkey=1zihkvttdgd2zf1af0dyvj924&st=ktfc445w&dl=0",
    "category": "Java"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/4ylR0DtP6usgTdNAbrAZQ8p2g2H2ubIKLdLAG_R4uig/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFPU0lLVytXS0wu/anBn",
    "altText": "Beginners Java image",
    "discount": "Java",
    "itemName": "Beginners Java",
    "oldPrice": "$12.00",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/t6uc7gtzfdh2i3liv8v30/Bignners-Java.pdf?rlkey=tt0q481oiz7xhh2ew59iwh7e2&st=8k0qyi03&dl=0",
    "category": "Java"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/K9HcJVbV0mCNmRqSn9jeoa7DC-P88rCL_HmyT1ggGuE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFOOGRaUWRsZEwu/anBn",
    "altText": "Java image",
    "discount": "Java",
    "itemName": "Java",
    "oldPrice": "$10.00",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/lycrs9jito75m4s0bm23t/Java.pdf?rlkey=xwlsgka0xyc7bwwlrzj8yfj53&st=g2bf6meq&dl=0",
    "category": "Java"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/8h_G-toRRkpKUDv0aWo_fh3DM4B9tIQ9a4hNn8I4E64/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDF0cEJRWXZIQkwu/anBn",
    "altText": "Java For Absolutely Beginners image",
    "discount": "Java",
    "itemName": "Java For Absolutely Beginners",
    "oldPrice": "$8.00",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/x3hnu6wvt6st7gct8edyk/Java-For-Absolutely-Biggeners.pdf?rlkey=1vopidgfg1qm5q8jvfrd3ia0m&st=aprcciwk&dl=0",
    "category": "Java"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/ymqUu3LtySY3AybAlgLYs5NBZvv5yGtNyKc5W03OLEY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFVczNNTXJqOUwu/anBn",
    "altText": "Java FX for Dummies image",
    "discount": "Java",
    "itemName": "Java FX for Dummies",
    "oldPrice": "$25.00",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/e88v3oags9m0yk2o8si7m/Java-FX-for-Dummies-PDFDrive.pdf?rlkey=oyuq2ioucf0cquzm5k0ynei7z&st=edb2usd1&dl=0",
    "category": "Java"
  },
  {
    "imgSrc": "https://imgs.search.brave.com/nHdflvSQlpxW-ez4v0sfdA-LizMuobGETmOLfgfOxCc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/Lzcxa3dMR0tKSjRM/LmpwZw",
    "altText": "Java in One Day image",
    "discount": "Java",
    "itemName": "Java in One Day",
    "oldPrice": "$5.00",
    "newPrice": "Free",
    "downloadLink": "https://www.dropbox.com/scl/fi/2qmhdqufqbzufqlasodv5/Java-in-One-day.pdf?rlkey=ugd2atxbc9hs7zkoeg6cgd6y0&st=044mj0qv&dl=0",
    "category": "Java"
  },

  {
    imgSrc: "https://imgs.search.brave.com/01yWXinkR2IotpXbnFqyc3jBCpZ4eiFsqoYUvVe1dqA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxM25VUldra2JM/LmpwZw",
    altText: "Data Structures and Algorithms in Java by Robert Lafore",
    discount: "DSA",
    itemName: "Data Structures and Algorithms in Java",
    oldPrice: "N/A",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/mcbnzdbs5fc6m9ih7ccqo/Data-Structures-Algorithms-in-Java-Robert-Lafore.pdf?rlkey=zq4vs31msuk3p0lhzfkdyeg6r&st=riyz6cav&dl=0",
    category: "DSA"
  },
  {
    imgSrc: "https://imgs.search.brave.com/KH6vwuElmTntbZ0P8JBydFjV8oDUvHdwltGBYkACJCM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaXNibmRiLmNv/bS9jb3ZlcnMvMzgv/NDgvOTc4MDI2MjAz/Mzg0OC5qcGc",
    altText: "Introduction to Algorithms, 3rd Edition",
    discount: "DSA",
    itemName: "Introduction to Algorithms",
    oldPrice: "N/A",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/92l9593m8dog2p7mwwnok/Introduction-to-algorithms-3rd-edition.pdf?rlkey=3xds998dg3vutmfj6pzatv6p7&st=fm2mxexw&dl=0",
    category: "DSA"
  },

  {
    imgSrc: "https://imgs.search.brave.com/1Esr8ocO0cJqk8L44TujKAj7sjD8T0iHHfiu-fNgd4E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFvQnJ5RjdwWkwu/anBn",
    altText: "Excel Dashboards",
    discount: "Microsoft",
    itemName: "Excel Dashboards",
    oldPrice: "N/A",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/otk0ibkpi7n1bj56lz7nz/Excel-Dashboards.pdf?rlkey=l3xp7av7kmp7heolord0ndmj7&st=mpxoo7qb&dl=0",
    category: "Microsoft"
  },

  {
    imgSrc: "https://imgs.search.brave.com/o0KGlg8i3i8mNBuAtVigx5Hy18aOvFnOjHvKbtuH3F0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxbUlxMmlKVVhM/LmpwZw",
    altText: "Cracking the Coding Interview, 6th Edition",
    discount: "Productivity",
    itemName: "Cracking the Coding Interview, 6th Edition",
    oldPrice: "N/A",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/mx9aenfjz310kzpsfx1px/Cracking-the-Coding-Interview-6th-Edition_-189-Programming-Questions-and-Solutions-PDFDrive.com.pdf?rlkey=256pia4kv5rn0zhxn93fata4j&st=km3ouovv&dl=0",
    category: "Productivity"
  },
  {
    imgSrc: "https://imgs.search.brave.com/n8xE3_sepSaLi_077ZArTDo2UcOqTvrtQ0XoEMdcM-4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxZTlxNlQ4LVhM/LmpwZw",
    altText: "Make Your Own PC For Beginners, 19th Edition",
    discount: "Productivity",
    itemName: "Make Your Own PC For Beginners, 19th Edition",
    oldPrice: "N/A",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/zq94xe6ydl2mdl4j6dl5q/Make-Your-Own-PC-For-Beginners-19th-Edition-2024.pdf?rlkey=qxrmey3k3k2fvsw1dneta5vfu&st=d9ja87mn&dl=0",
    category: "Productivity"
  },

  {
    imgSrc: "https://imgs.search.brave.com/IeY-eLNpa_MzxTM6eQXwh-gN0RUPRchy0YMGyRI18pQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzUxR2N5R095TFRM/LmpwZw",
    altText: "Artificial Intelligence",
    discount: "AI",
    itemName: "Artificial Intelligence",
    oldPrice: "N/A",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/4rf68lmqmdich41w06c3o/Artificial-Intelligence.pdf?rlkey=astalorlqr5p746mpb9pivvqy&st=4mjy1d29&dl=0",
    category: "AI"
  },
  {
    imgSrc: "https://imgs.search.brave.com/fIMhnx8kXzop3NFSx-1ZBkq1NmhGAllM1QN98BdPVIo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb3V2/ZXJ0dXJlLm51bWls/b2cuY29tLzk3ODEz/OTQyNDkxMzhfdzMw/MC5qcGc", // Add appropriate image URLs
    altText: "Coding with AI For Dummies",
    discount: "AI",
    itemName: "Coding with AI For Dummies",
    oldPrice: "N/A",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/uzl3lgvvtikbqx18opnn9/Coding-with-AI-For-Dummies.pdf?rlkey=0bmxiambkrwlnp77i1rstdgig&st=rwl1uxhw&dl=0",
    category: "AI"
  },
  {
    imgSrc: "https://imgs.search.brave.com/LkuOvrrsYlJfrWt9PD5cDEv2V8k-rsJuk_Pe05e1dXs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMS5z/bmRjZG4uY29tL2Fy/dHdvcmtzLVdRNFRR/VlRmekZxMnc3MjEt/a0toR1Z3LXQ1MDB4/NTAwLmpwZw", // Add appropriate image URLs
    altText: "Developing Apps with GPT-4 and ChatGPT",
    discount: "AI",
    itemName: "Developing Apps with GPT-4 and ChatGPT",
    oldPrice: "N/A",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/r20qv332ydbmcbwmco9hz/Developing-Apps-with-GPT-4-and-ChatGPT-True-EPUB.pdf?rlkey=o4cxd8xafjmsjodijxkxwjhq7&st=p1etlgec&dl=0",
    category: "AI"
  },
  {
    imgSrc: "https://imgs.search.brave.com/0Z18oaip9fdKlG4VSWmNczRqIT4rVPZTm66lYiFELX8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFubCt5c3dkZEwu/anBn", // Add appropriate image URLs
    altText: "Top AI Tools That Changed the Game in Digital Marketing",
    discount: "AI",
    itemName: "Top AI Tools That Changed the Game in Digital Marketing",
    oldPrice: "N/A",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/k7fcfz92rl7hfmyb0zfyo/Top-AI-Tools-That-Changed-the-Game-in-Digital-Marketing.pdf?rlkey=vksqj7ncmm4ogc4e0uldtg42x&st=629woqb6&dl=0",
    category: "AI"
  },

  {
    imgSrc: "https://imgs.search.brave.com/2KToG_g2VLdFVZEDGwIg3jaKgciAJ6qGxyXPYD2qq60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzY2LzY5Lzk4/LzM2MF9GXzc2NjY5/OTgwNV9qM2hxZHVS/dmtqNmpGVEJrZ0Y5/b0hISFNqMGNXN2tI/Uy5qcGc",
    altText: "Default image",
    discount: "Java",
    itemName: "Advance Java For Beginners",
    oldPrice: "$20.50",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/3z39wk9fg38n72cnarfye/Advanve-Java-For-Beginers.pdf?rlkey=c0xd50c4icvgrwloazc165wap&st=a3ize1r4&dl=0",
    category: "My E-Books"
  },
  {
    imgSrc: "https://imgs.search.brave.com/2KToG_g2VLdFVZEDGwIg3jaKgciAJ6qGxyXPYD2qq60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzY2LzY5Lzk4/LzM2MF9GXzc2NjY5/OTgwNV9qM2hxZHVS/dmtqNmpGVEJrZ0Y5/b0hISFNqMGNXN2tI/Uy5qcGc",
    altText: "Default image",
    discount: "Java",
    itemName: "Android Development For Beginners Using Java",
    oldPrice: "$20.50",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/p1gdr2p6meymphv9mnkje/Android-Development-For-Begeners-Using-Java.pdf?rlkey=a5h187nmdh4kh950mhus5w2at&st=66jdexov&dl=0",
    category: "My E-Books"
  },
  {
    imgSrc: "https://imgs.search.brave.com/2KToG_g2VLdFVZEDGwIg3jaKgciAJ6qGxyXPYD2qq60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzY2LzY5Lzk4/LzM2MF9GXzc2NjY5/OTgwNV9qM2hxZHVS/dmtqNmpGVEJrZ0Y5/b0hISFNqMGNXN2tI/Uy5qcGc",
    altText: "Default image",
    discount: "Java",
    itemName: "Django",
    oldPrice: "$20.50",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/c16bfrv2zi0lzn7kfczpu/Django.pdf?rlkey=5woplkiyo0ez3ua5peoip10d5&st=zo7vbz5d&dl=0",
    category: "My E-Books"
  },
  {
    imgSrc: "https://imgs.search.brave.com/2KToG_g2VLdFVZEDGwIg3jaKgciAJ6qGxyXPYD2qq60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzY2LzY5Lzk4/LzM2MF9GXzc2NjY5/OTgwNV9qM2hxZHVS/dmtqNmpGVEJrZ0Y5/b0hISFNqMGNXN2tI/Uy5qcGc",
    altText: "Default image",
    discount: "Java",
    itemName: "Java For Beginners",
    oldPrice: "$20.50",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/4hd3foy6o0f17luj7jozs/Java-For-Beginers.pdf?rlkey=f7xdxkn0w7stf2cbsvdawhzyq&st=wv0tp6a2&dl=0",
    category: "My E-Books"
  },
  {
    imgSrc: "https://imgs.search.brave.com/2KToG_g2VLdFVZEDGwIg3jaKgciAJ6qGxyXPYD2qq60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzY2LzY5Lzk4/LzM2MF9GXzc2NjY5/OTgwNV9qM2hxZHVS/dmtqNmpGVEJrZ0Y5/b0hISFNqMGNXN2tI/Uy5qcGc",
    altText: "Default image",
    discount: "JavaScript",
    itemName: "JavaScript For Beginners: Basic To Advance",
    oldPrice: "$20.50",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/wscxvyyx9x8l7xb15mbku/Java-Script-For-Beginers-Basic-To-Advance.pdf?rlkey=dgdh5xqmlxzhj5bt9ryciwabn&st=i3mef1fs&dl=0",
    category: "My E-Books"
  },
  {
    imgSrc: "https://imgs.search.brave.com/2KToG_g2VLdFVZEDGwIg3jaKgciAJ6qGxyXPYD2qq60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzY2LzY5Lzk4/LzM2MF9GXzc2NjY5/OTgwNV9qM2hxZHVS/dmtqNmpGVEJrZ0Y5/b0hISFNqMGNXN2tI/Uy5qcGc",
    altText: "Default image",
    discount: "Python",
    itemName: "Python For Beginners: Basics To Advance",
    oldPrice: "$20.50",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/n64tz2rn9q7sarqyadoev/Python-For-Beginers-Basics-To-Advance.pdf?rlkey=plrm43tueh63og6sobrp07syf&st=ong0mfmr&dl=0",
    category: "My E-Books"
  },
  {
    imgSrc: "https://imgs.search.brave.com/2KToG_g2VLdFVZEDGwIg3jaKgciAJ6qGxyXPYD2qq60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzY2LzY5Lzk4/LzM2MF9GXzc2NjY5/OTgwNV9qM2hxZHVS/dmtqNmpGVEJrZ0Y5/b0hISFNqMGNXN2tI/Uy5qcGc",
    altText: "Default image",
    discount: "REST Framework",
    itemName: "REST Framework For Beginners",
    oldPrice: "$20.50",
    newPrice: "Free",
    downloadLink: "https://www.dropbox.com/scl/fi/vc0ekkob08nmrj88q80ja/Rest-FrameWork-For-Begenners.pdf?rlkey=tbrx0o6221l644qy7ngnx4jkv&st=calmymbk&dl=0",
    category: "My E-Books"
  }

];