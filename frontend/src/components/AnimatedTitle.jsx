import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  color: ${props => props.theme.title};
`;

const AnimatedTitle = ({ text }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.03
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <Title variants={titleVariants} initial="hidden" animate="visible">
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Title>
  );
};

export default AnimatedTitle;