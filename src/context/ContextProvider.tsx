import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ContextProps {
  // Product Compulsory fields
  productName: string;
  setProductName: (productName: string) => void;

  productCategory: string;
  setProductCategory: (productCategory: string) => void;

  productSubCategory: string;
  setProductSubCategory: (productSubCategory: string) => void;

  productDescription: string;
  setProductDescription: (productDescription: string) => void;

  productTagline: string;
  setProductTagline: (productTagline: string) => void;

  setMediaLinks: Dispatch<SetStateAction<Record<string, any>[]>>;
  mediaLinks: Record<string, any>[];

  // Handle Support Info
  productInfo: { [key: string]: any };
  setProductInfo: (productInfo: { [key: string]: any }) => void;

  sourceLinks: { [key: string]: any };
  setSourceLinks: (sourceLinks: { [key: string]: any }) => void;

  // Handle Additional Information
  additionalInfo: { [key: string]: any };
  setAdditionalInfo: (additionalInfo: { [key: string]: any }) => void;

  // Handle Cast Info
  castInfo: { [key: string]: any };
  setCastInfo: (castInfo: { [key: string]: any }) => void;

  // Handle Instructor Info
  instructor: { [key: string]: any };
  setInstructor: (instructor: { [key: string]: any }) => void;

  // Handle Contact Info
  contact: { [key: string]: any };
  setContact: (instructor: { [key: string]: any }) => void;

  // Handle Service Info
  service: { [key: string]: any };
  setService: (instructor: { [key: string]: any }) => void;

  name: string;
  setName: (name: string) => void;
}

const StateContext = createContext<ContextProps | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Product Compulsory fields
  const [productName, setProductName] = useState('');
  // const [productTagline, setProductTagline] = useState("")
  const [productLogo, setProductLogo] = useState<File | undefined>(undefined);
  const [productCategory, setProductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');
  const [productTagline, setProductTagline] = useState('');
  const [productDescription, setProductDescription] = useState('');

  // Compatible Devices

  // Handling Media
  const [bannerImage, setBannerImage] = useState<any>('');
  const [mediaLinks, setMediaLinks] = useState<Record<string, any>[]>([]);

  // Handle Support Info
  const [productInfo, setProductInfo] = useState<{ [key: string]: any }>({});

  // Handle Source Links
  const [sourceLinks, setSourceLinks] = useState<{ [key: string]: any }>([]);

  // Additonal Info
  const [additionalInfo, setAdditionalInfo] = useState<{ [key: string]: any }>(
    {},
  );

  // Cast Info
  const [castInfo, setCastInfo] = useState<{ [key: string]: any }>({});

  // Instructor Info
  const [instructor, setInstructor] = useState<{ [key: string]: any }>({});

  // Contact Info
  const [contact, setContact] = useState<{ [key: string]: any }>({});
  const [service, setService] = useState<Record<string, string>>({});

  // Name - Insstructor / Contact
  const [name, setName] = useState('');

  const contextValue = useMemo(
    () => ({
      // Product Compulsory fields
      productName,
      setProductName,

      productCategory,
      setProductCategory,

      productSubCategory,
      setProductSubCategory,

      productDescription,
      setProductDescription,

      productTagline,
      setProductTagline,

      // Handling Media
      bannerImage,
      setBannerImage,
      mediaLinks,
      setMediaLinks,

      // Handle Support Info
      productInfo,
      setProductInfo,

      // Handle Source Links
      sourceLinks,
      setSourceLinks,

      // Handle Additional Information
      additionalInfo,
      setAdditionalInfo,

      castInfo,
      setCastInfo,

      instructor,
      setInstructor,

      contact,
      setContact,

      name,
      setName,

      service,
      setService,
    }),
    [
      productName,
      productCategory,
      productSubCategory,
      productDescription,
      productTagline,
      bannerImage,
      mediaLinks,
      sourceLinks,
      castInfo,
      instructor,
      contact,
      name,
      service,
    ],
  );

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
