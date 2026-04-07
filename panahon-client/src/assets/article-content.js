// Import your images at the top of the data file
import todagoImg from './icons/app.png'; 
import blenderImg from './icons/blender.png'; 
import newsfeedImg from './icons/newsfeed.png'; 
import tennisImg from './icons/tennis.png'; 

const articles = [
    {
        name: "todago-app",
        title: "TodaGo: Ride-Hailing App",
        category: "Capstone",
        image: todagoImg,
        content: [
            "Modernizing local transport using Flutter. A capstone project focused on real-time booking logic."
        ]
    },
    {
        name: "blender-footwear",
        title: "Footwear Design in Blender",
        category: "3D Modeling",
        image: blenderImg,
        content: [
            "Exploring 3D space by creating high-fidelity shoe models with custom textures and lighting."
        ]
    },
    {
        name: "social-newsfeed",
        title: "Social Newsfeed UI",
        category: "Flutter App",
        image: newsfeedImg,
        content: [
            "Developing interactive newsfeed features and notification systems for mobile programming."
        ]
    },
    {
        name: "tennis-discipline",
        title: "17 Years on the Court",
        category: "Discipline",
        image: tennisImg,
        content: [
            "How a lifetime of competitive lawn tennis shaped my approach to software engineering."
        ]
    }
];

export default articles;