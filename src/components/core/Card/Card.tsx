import React from 'react';
import styles from './Card.module.css';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

// Main
const Card: React.FC<CardProps> & { Footer: React.FC<CardProps> } & { Header: React.FC<CardProps> } = ({ children, className, ...rest }) => {
    return (
        <div className={`${styles.main} ${className}`} {...rest}>
            {children}
        </div>
    );
};

Card.displayName = 'Card';


// Header
const CardHeader: React.FC<CardProps> = ({ children, className, ...rest }) => {
    return (
        <div className={`${styles.header} ${className}`} {...rest}>
            {children}
        </div>
    );
};

CardHeader.displayName = 'Card.Header';
Card.Header = CardHeader;


// Footer
const CardFooter: React.FC<CardProps> = ({ children, className, ...rest }) => {
    return (
        <div className={`${styles.footer} ${className}`} {...rest}>
            {children}
        </div>
    );
};

CardFooter.displayName = 'Card.Footer';
Card.Footer = CardFooter;

export default Card;