import { motion } from 'framer-motion';
import { HeroSection } from '../Components/HeroSection';
import { ServicesSection } from '../Components/ServicesSection';
import { TestimonialsSection } from '../Components/TestimonialsSection';
import { ContactSection } from '../Components/ContactSection';
import { GallerySection } from '../Components/GallerySection';
import { TeamSection } from '../Components/TeamSection';
import { PricingSection } from '../Components/PricingSection';

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>
        <HeroSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="animate"
        initial="initial"
      >
        <ServicesSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="animate"
        initial="initial"
      >
        <GallerySection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="animate"
        initial="initial"
      >
        <TeamSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="animate"
        initial="initial"
      >
        <PricingSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="animate"
        initial="initial"
      >
        <TestimonialsSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="animate"
        initial="initial"
      >
        <ContactSection />
      </motion.div>
    </motion.div>
  );
};

export default Home;