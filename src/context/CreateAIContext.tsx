import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { useDisclosure } from '@mantine/hooks';

interface AiPostContextType {
  generateAiFlow: boolean;
  setGenerateAiFlow: React.Dispatch<React.SetStateAction<boolean>>;
  openPost: boolean;
  setOpenPost: React.Dispatch<React.SetStateAction<boolean>>;
  AILoader: boolean;
  setAILoader: React.Dispatch<React.SetStateAction<boolean>>;
  ImagePostPreview: boolean;
  setImagePostPreview: React.Dispatch<React.SetStateAction<boolean>>;
  generateAIPostImage: boolean;
  setGenerateAIPostImage: React.Dispatch<React.SetStateAction<boolean>>;
  errorModalDisplay: boolean;
  setErrorModalDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  openAiLoaderModal: () => void;
  generatePostImgCombine: () => void;
  AIPostImgPreview: () => void;
  ErrorModalDisplayFtn: () => void;
  openPostAIModal: () => void;
  openImageAIModal: () => void;
  opened: boolean;
}

const AiPostContext = createContext<any>(undefined);

export const AiPostProvider = ({ children }: { children: ReactNode }) => {
  const [generateAiFlow, setGenerateAiFlow] = useState(false);
  const [AILoader, setAILoader] = useState(false);
  const [createOpenPost, setCreateOpenPost] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [ImagePostPreview, setImagePostPreview] = useState(false);
  const [generateAIPostImage, setGenerateAIPostImage] = useState(false);
  const [errorModalDisplay, setErrorModalDisplay] = useState(false);
  const [openPost, setOpenPost] = useState(false)

  const openAiLoaderModal = () => {
    setAILoader(true);
    setGenerateAIPostImage(false);
  };

  const generatePostImgCombine = () => {
    setGenerateAIPostImage(true);
    
  };

  const AIPostImgPreview = () => {
    setImagePostPreview(true);
    setAILoader(false);
  };

  const ErrorModalDisplayFtn = () => {
    setAILoader(false);
    setErrorModalDisplay(true);
  };

  const openImageAIModal = () => {
    setOpenImage(true)
  };
  
  const openPostAIModal = () => {
    setCreateOpenPost(true);
    setImagePostPreview(false);

  }

  const value = useMemo(
    () => ({
      generateAiFlow,
      setGenerateAiFlow,
      createOpenPost,
      setCreateOpenPost,
      AILoader,
      setAILoader,
      ImagePostPreview,
      setImagePostPreview,
      generateAIPostImage,
      setGenerateAIPostImage,
      errorModalDisplay,
      setErrorModalDisplay,
      openAiLoaderModal,
      generatePostImgCombine,
      AIPostImgPreview,
      ErrorModalDisplayFtn,
      openPostAIModal,
      openImage,
      setOpenImage,
      setOpenPost,
      openPost
    }),
    [
      generateAiFlow,
      AILoader,
      ImagePostPreview,
      generateAIPostImage,
      errorModalDisplay,
      openImageAIModal
    ]
  );

  return <AiPostContext.Provider value={value}>{children}</AiPostContext.Provider>;
};

export const useAiPost = () => {
  const context = useContext(AiPostContext);
  if (!context) {
    throw new Error('useAiPost must be used within an AiPostProvider');
  }
  return context;
};
