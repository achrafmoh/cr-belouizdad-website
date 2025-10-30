// constants.tsx
import React from 'react';

// --- IMAGE MAPPING GUIDE ---
// To replace the placeholder images, name your files exactly as listed below
// and place them in the same folder as your application.
//
// == LOGO ==
// logo.png: The main club crest (red, white, and black).
//
// == SEQUENTIAL IMAGES (1.jpg - 20.jpg) ==
// 1.jpg:  Hero Section Background - A dramatic, wide shot of the stadium.
// 2.jpg:  History (1962) - Vintage, black-and-white photo for Founding Year.
// 3.jpg:  History (1965-1970) - Vintage photo of a team celebrating for The Golden Era.
// 4.jpg:  History (2000-2001) - Photo of fans with a 2000s aesthetic for Return to Glory.
// 5.jpg:  History (2019-Present) - Modern photo of the team celebrating for Modern Dominance.
// 6.jpg:  Matchday Moments: Goal Celebration (Action shot of players celebrating a goal).
// 7.jpg:  Matchday Moments: Midfield Battle (Players competing for the ball).
// 8.jpg:  Matchday Moments: Pre-match Huddle (Team together before kickoff).
// 9.jpg:  Matchday Moments: The Captain's Orders (Team captain giving instructions).
// 10.jpg: Matchday Moments: Defensive Wall (A free-kick wall).
// 11.jpg: Matchday Moments: Final Whistle Victory (Team celebrating a win with fans).
// 12.jpg: Stadium Section Background - A bright, clear, wide shot of the stadium.
// --- END IMAGE MAPPING GUIDE ---

export const NAV_LINKS = [
    { name: 'History', href: '#history' },
    { name: 'Moments', href: '#moments' },
    { name: 'Honors', href: '#honors' },
    { name: 'Stadium', href: '#stadium' },
];

export const GALLERY_ITEMS = [
  {
    year: '1962',
    title: 'Founding Year',
    description: 'Born from the spirit of independence, Chabab Riadhi Belouizdad was founded, uniting a community with a passion for football.',
    imageSrc: '2.jpg',
  },
  {
    year: '1965-1970',
    title: 'The Golden Era',
    description: 'A period of early dominance, CRB clinched multiple league titles and cups, establishing itself as a powerhouse in Algerian football.',
    imageSrc: '3.jpg',
  },
  {
    year: '2000-2001',
    title: 'Return to Glory',
    description: 'After years of perseverance, the club recaptured the Ligue 1 title, marking a triumphant return to the top of the league.',
    imageSrc: '4.jpg',
  },
  {
    year: '2019-Present',
    title: 'Modern Dominance',
    description: 'A new dynasty begins. CRB secures consecutive championships, showcasing tactical brilliance and an unbreakable team spirit.',
    imageSrc: '5.jpg',
  },
];

export const MATCHDAY_IMAGES = [
  { src: '6.jpg', caption: 'Goal Celebration' },
  { src: '7.jpg', caption: 'Midfield Battle' },
  { src: '8.jpg', caption: 'Pre-match Huddle' },
  { src: '9.jpg', caption: 'The Captain\'s Orders' },
  { src: '10.jpg', caption: 'Defensive Wall' },
  { src: '11.jpg', caption: 'Final Whistle Victory' },
];

export const HONORS = [
  {
    count: '10×',
    title: 'Ligue 1 Champions',
  },
  {
    count: '9×',
    title: 'Algerian Cup Winners',
  },
  {
    count: '3×',
    title: 'Maghreb Champions Cup',
  },
];

export const ICONS = {
  crbLogo: (
    <img src="logo.png" alt="CR Belouizdad Logo" className="w-full h-full" />
  ),
  trophy: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 1011.31-8.97 1.5 1.5 0 012.39.04 9.75 9.75 0 01-4.7 8.93zM12 21.75a1.5 1.5 0 001.5-1.5v-2.25a1.5 1.5 0 00-3 0v2.25a1.5 1.5 0 001.5 1.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.501 12.013a9.718 9.718 0 011.51-4.825 1.5 1.5 0 012.333.619 9.72 9.72 0 011.165 4.206m-7.342-4.206a9.75 9.75 0 019.26-6.113 1.5 1.5 0 011.82 1.258 9.75 9.75 0 01-1.383 6.113M19.5 12.013a9.718 9.718 0 01-1.51 4.825 1.5 1.5 0 01-2.333-.619 9.72 9.72 0 01-1.165-4.206" />
    </svg>
  ),
  facebook: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
    </svg>
  ),
  instagram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664 4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
    </svg>
  ),
};