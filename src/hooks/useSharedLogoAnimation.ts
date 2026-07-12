'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocale } from 'next-intl';

interface MeaningsData {
  [key: string]: {
    [letter: string]: string[];
  };
}

// Global state for shared animation
const globalAnimationState = {
  isAnimating: false,
  currentMeanings: ['All-round', 'Innovative', 'Process', 'Optimization', 'eXecution'],
  animationCallbacks: new Set<() => void>(),
  meaningUpdateCallbacks: new Set<(meanings: string[]) => void>(),
};

export function useSharedLogoAnimation() {
  const locale = useLocale();
  const [meanings, setMeanings] = useState<MeaningsData | null>(null);
  const [currentMeanings, setCurrentMeanings] = useState<string[]>(
    globalAnimationState.currentMeanings
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousWords, setPreviousWords] = useState<(string | null)[]>(new Array(5).fill(null));

  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoRotateInterval = 15000; // 15 seconds

  // Load meanings data
  useEffect(() => {
    async function loadMeanings() {
      try {
        // Use absolute path without window.location to avoid Next.js locale routing
        const response = await fetch('/meanings.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMeanings(data);
      } catch (error) {
        console.error('Failed to load meanings:', error);
        // Fallback data
        setMeanings({
          [locale]: {
            A: ['All-round', 'Artificial', 'Automation', 'Arthur'],
            I: ['Innovative', 'Intelligence', 'IT', 'Impactful'],
            P: ['Process', 'Programming', 'Practical', 'Performance'],
            O: ['Optimization', 'Operational', 'Outstanding', 'Organized'],
            X: ['eXecution', 'eXperience', 'eXcellence', 'eXpertise'],
          },
        });
      }
    }

    loadMeanings();
  }, [locale]);

  // Helper function to get random word that's different from previous
  const getRandomWord = useCallback((words: string[], previousWord: string | null): string => {
    if (!words || words.length === 0) return previousWord || 'Unknown';
    if (words.length === 1) return words[0];

    const availableWords = words.filter((word) => word !== previousWord);
    return availableWords[Math.floor(Math.random() * availableWords.length)] || words[0];
  }, []);

  // Generate new meanings
  const generateNewMeanings = useCallback((): string[] => {
    if (!meanings || !meanings[locale]) return currentMeanings;

    const letters = ['A', 'I', 'P', 'O', 'X'];
    const newMeanings: string[] = [];
    const newPreviousWords: (string | null)[] = [];

    letters.forEach((letter, index) => {
      const letterMeanings = meanings[locale][letter] || [`${letter}word`];
      const newWord = getRandomWord(letterMeanings, previousWords[index]);
      newMeanings.push(newWord);
      newPreviousWords.push(newWord);
    });

    setPreviousWords(newPreviousWords);
    return newMeanings;
  }, [meanings, locale, currentMeanings, previousWords, getRandomWord]);

  // Main animation trigger
  const triggerAnimation = useCallback(
    async (isAutomatic = false) => {
      if (globalAnimationState.isAnimating) return;

      globalAnimationState.isAnimating = true;
      setIsAnimating(true);

      // Reset auto-rotate timer on manual trigger
      if (!isAutomatic && autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }

      // Trigger letter animations on all logo instances
      globalAnimationState.animationCallbacks.forEach((callback) => callback());

      // Generate and update meanings after letter animation
      setTimeout(() => {
        const newMeanings = generateNewMeanings();
        globalAnimationState.currentMeanings = newMeanings;
        setCurrentMeanings(newMeanings);

        // Update all instances
        globalAnimationState.meaningUpdateCallbacks.forEach((callback) => callback(newMeanings));
      }, 600); // After letter spin animation

      // Complete animation
      setTimeout(() => {
        globalAnimationState.isAnimating = false;
        setIsAnimating(false);

        // Restart auto-rotate timer
        if (autoRotateTimerRef.current) {
          clearTimeout(autoRotateTimerRef.current);
        }
        autoRotateTimerRef.current = setTimeout(() => {
          triggerAnimation(true);
        }, autoRotateInterval);
      }, 1750);
    },
    [generateNewMeanings, autoRotateInterval]
  );

  // Initialize auto-rotate
  useEffect(() => {
    // Start auto-rotate timer
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }
    autoRotateTimerRef.current = setTimeout(() => {
      triggerAnimation(true);
    }, autoRotateInterval);

    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, [triggerAnimation, autoRotateInterval]);

  // Register/unregister callbacks
  const registerAnimationCallback = useCallback((callback: () => void) => {
    globalAnimationState.animationCallbacks.add(callback);
    return () => {
      globalAnimationState.animationCallbacks.delete(callback);
    };
  }, []);

  const registerMeaningUpdateCallback = useCallback((callback: (meanings: string[]) => void) => {
    globalAnimationState.meaningUpdateCallbacks.add(callback);
    return () => {
      globalAnimationState.meaningUpdateCallbacks.delete(callback);
    };
  }, []);

  return {
    currentMeanings,
    isAnimating,
    triggerAnimation,
    registerAnimationCallback,
    registerMeaningUpdateCallback,
    meanings,
  };
}
