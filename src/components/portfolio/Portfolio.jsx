import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    id: 1,
    img: "/p1.jpg",
    title: "Full Stack Blog Application",
    link: "https://github.com/AmineFx",
    desc: "Plateforme de blog moderne permettant aux utilisateurs de créer, publier et gérer des articles. L'application intègre un système d'authentification, la gestion des profils, les commentaires et une interface dynamique pour une meilleure expérience utilisateur.Développée avec une architecture Full Stack, elle met en place une API REST, une gestion sécurisée des utilisateurs et une base de données optimisée.",
  },
  {
    id: 2,
    img: "/p2.jpg",
    title: "School Management System",
    link: "https://github.com/AmineFx",
    desc: "Application web permettant de gérer efficacement les établissements scolaires. Elle facilite la gestion des élèves, enseignants, classes, notes et emplois du temps avec une interface moderne et intuitive. Développée avec des technologies Full Stack, cette solution offre une gestion sécurisée des données, une authentification utilisateur et une architecture pensée pour être évolutive.",
  },
  {
    id: 3,
    img: "/p3.jpg",
    title: "Real-time Chat Application",
    link: "https://github.com/AmineFx",
    desc: "Application de messagerie instantanée permettant aux utilisateurs d'échanger des messages en temps réel grâce à une communication fluide et sécurisée. Le projet intègre l'authentification des utilisateurs, la gestion des conversations privées et une interface moderne adaptée aux différents appareils.Développée avec une architecture Full Stack et des technologies temps réel pour garantir des échanges rapides et fiables.Technologies utilisées : React, TypeScript, Node.js, Express, Socket.io, MongoDB/PostgreSQL, JWT."
  },
  {
    id: 4,
    img: "/p4.jpg",
    title: "Social Media Project",
    link: "https://github.com/AmineFx",
    desc: "Application de messagerie instantanée permettant aux utilisateurs d'échanger des messages en temps réel grâce à une communication fluide et sécurisée. Le projet intègre l'authentification des utilisateurs, la gestion des conversations privées et une interface moderne adaptée aux différents appareils.Développée avec une architecture Full Stack et des technologies temps réel pour garantir des échanges rapides et fiables.Technologies utilisées : React, TypeScript, Node.js, Express, Socket.io, MongoDB/PostgreSQL, JWT.",
  },
  {
    id: 5,
    img: "/p5.jpg",
    title: "Animated Portfolio Website",
    link: "https://github.com/AmineFx",
    desc: "Portfolio interactif et immersif conçu pour présenter mon parcours, mes compétences et mes réalisations à travers une expérience utilisateur moderne. Le site intègre des animations fluides, des effets 3D et une navigation dynamique afin de créer une présentation unique et engageante.Développé avec des technologies Front-End modernes, ce projet met en avant la créativité, les performances et l'optimisation de l'expérience utilisateur.",
    
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     const rect = ref.current.getBoundingClientRect();
  //     setContainerDistance(rect.left);
  //   }
  // }, []);

  // FIX: Re-calculate when screen size changes
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
