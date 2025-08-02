import client1 from "./assets/client-1.jpeg";
import client2 from "./assets/client-2.jpeg";
import client3 from "./assets/client-3.jpeg";
import client4 from "./assets/client-4.jpeg";
import client5 from "./assets/client-5.jpeg";
import {IoMdAnalytics} from "react-icons/io";
import {IoCallOutline, IoLocationOutline} from "react-icons/io5";
import {GrUserExpert} from "react-icons/gr";
import {MdOutlineSupportAgent, MdOutlineAlternateEmail} from "react-icons/md";
import {RiExchange2Fill} from "react-icons/ri";
import {FaInstagram, FaXTwitter, FaYoutube, FaLaptopCode} from "react-icons/fa6";
import {FaFacebookSquare, FaPaintBrush} from "react-icons/fa";
import {TfiWrite} from 'react-icons/tfi'
import {DiReact} from "react-icons/di";
import {FaNodeJs} from "react-icons/fa";
import {SiExpress, SiMongodb} from "react-icons/si";
import {CgFigma} from "react-icons/cg";
import {TbBrandReactNative} from "react-icons/tb";
import {SiAdobexd} from "react-icons/si";
import {TiHtml5} from "react-icons/ti";
import {FaCss3Alt} from "react-icons/fa6";
import {RiJavascriptFill} from "react-icons/ri";
import {FaJava} from "react-icons/fa6";
import {TbFileTypeXml} from "react-icons/tb";
import {FaVolleyball} from "react-icons/fa6";
import {FaGooglePlay} from "react-icons/fa";
import {FaQuestionCircle} from "react-icons/fa";
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import portfolioData from './portfolio.json';

// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://rev-database-v2.vercel.app/api/collections',
    API_KEY: 'bWRjM202MXVyZ3J4ZXBnOTdvbDoxNzUzMDQxNDQ3NzE1', // Fixed typo: bWRqM -> bWRjM
    DATABASE: 'portfolio',
    TIMEOUT: 10000, // 10 seconds timeout
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000 // 1 second
};

// Cache for API data with timestamp for expiry
let dataCache = {};
const CACHE_EXPIRY = 5 * 60 * 1000;
// 5 minutes

// Enhanced error handling
class APIError extends Error {
    constructor(message, status, endpoint) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.endpoint = endpoint;
    }
}

// Icon component mapping for dynamic rendering
const iconComponents = {
    // Why Choose Me icons
    GrUserExpert,
    IoMdAnalytics,
    MdOutlineSupportAgent,
    RiExchange2Fill,

    // Services icons
    FaPaintBrush,
    FaLaptopCode,
    TfiWrite,

    // Contact icons
    MdOutlineAlternateEmail,
    IoCallOutline,
    IoLocationOutline,

    // Social icons
    FaInstagram,
    FaFacebookSquare,
    FaXTwitter,
    FaYoutube,

    // Tech stack icons
    TiHtml5,
    FaCss3Alt,
    RiJavascriptFill,
    FaGooglePlay,
    SiAdobexd,
    FaJava,
    TbFileTypeXml,
    FaVolleyball,
    DiReact,
    FaNodeJs,
    SiExpress,
    SiMongodb,
    CgFigma,
    TbBrandReactNative,
    FaQuestionCircle
};

// Image mapping for clients
const clientImages = {
    'client1': client1,
    'client2': client2,
    'client3': client3,
    'client4': client4,
    'client5': client5,
    'client-1': client1, // Alternative naming
    'client-2': client2,
    'client-3': client3,
    'client-4': client4,
    'client-5': client5
};

// Enhanced icon rendering with better error handling
const renderIcon = (iconName, size = 24, className = '') => {
    if (!iconName) 
        return null;
    

    // Handle different possible formats
    let cleanIconName = iconName;

    // If it's already a React element, return it
    if (React.isValidElement(iconName)) {
        return iconName;
    }

    // If it's a string, clean it up
    if (typeof iconName === 'string') { // Remove JSX-like syntax, quotes, and other unwanted characters
        cleanIconName = iconName.replace(/['"<>\/\{\}\s]/g, '') // Remove quotes, brackets, slashes, spaces.replace(/^\w*?([A-Z][a-zA-Z0-9]*)/g, '$1') // Extract component name.trim();
    }

    const IconComponent = iconComponents[cleanIconName];

    if (IconComponent) {
        return React.createElement(IconComponent, {
            size,
            className: `portfolio-icon ${className}`.trim(),
            'data-icon': cleanIconName
        });
    }

    // Log warning for debugging but don't spam console in production
    if (process.env.NODE_ENV === 'development') {
        console.warn(`Icon not found: '${cleanIconName}' from original: '${iconName}'`);
        console.log('Available icons:', Object.keys(iconComponents));
    }

    return React.createElement(FaQuestionCircle, {
        size,
        className: `portfolio-icon fallback-icon ${className}`.trim(),
        title: `Missing icon: ${cleanIconName}`
    });
};

// Enhanced fetch with retry logic and timeout
const fetchWithRetry = async (url, options, attempt = 1) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (! response.ok) {
            throw new APIError(`HTTP ${
                response.status
            }: ${
                response.statusText
            }`, response.status, url);
        }

        return response;
    } catch (error) {
        clearTimeout(timeoutId);

        if (attempt < API_CONFIG.RETRY_ATTEMPTS && ! controller.signal.aborted) {
            console.warn(`Attempt ${attempt} failed for ${url}, retrying...`);
            await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY * attempt));
            return fetchWithRetry(url, options, attempt + 1);
        }

        throw error;
    }
};

// Fallback function to get data from local JSON
const getFallbackData = (collectionName) => {
    try {
        if (portfolioData && portfolioData.collections && portfolioData.collections[collectionName]) {
            console.log(`Using fallback data for ${collectionName}`);
            return portfolioData.collections[collectionName];
        }

        console.warn(`No fallback data found for ${collectionName}`);
        return [];
    } catch (error) {
        console.error(`Error accessing fallback data for ${collectionName}:`, error);
        return [];
    }
};

// Enhanced API fetch function with better auth handling and fallback support
const fetchCollectionData = async (collectionName) => { // Check cache first
    const cached = dataCache[collectionName];
    if (cached && (Date.now() - cached.timestamp) < CACHE_EXPIRY) {
        return cached.data;
    }

    const url = `${
        API_CONFIG.BASE_URL
    }/${collectionName}?db=${
        API_CONFIG.DATABASE
    }`;

    try { // Try multiple authentication header formats
        const authHeaders = [
            {
                'x-api-key': API_CONFIG.API_KEY
            }, {
                'Authorization': `Bearer ${
                    API_CONFIG.API_KEY
                }`
            }, {
                'Authorization': `Basic ${
                    API_CONFIG.API_KEY
                }`
            }, {
                'api-key': API_CONFIG.API_KEY
            }
        ];

        let response;
        let lastError;

        // Try different auth methods
        for (let i = 0; i < authHeaders.length; i++) {
            try {
                response = await fetchWithRetry(url, {
                    headers: {
                        ... authHeaders[i],
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                break; // Success, exit loop
            } catch (error) {
                lastError = error;
                if (error.status === 401 && i < authHeaders.length - 1) {
                    console.warn(`Auth method ${
                        i + 1
                    } failed, trying next...`);
                    continue; // Try next auth method
                }
                throw error; // Re-throw if not auth error or last attempt
            }
        }

        if (! response) {
            throw lastError || new APIError('All authentication methods failed', 401, url);
        }

        const result = await response.json();

        // Validate response structure
        if (! result || typeof result !== 'object') {
            throw new APIError('Invalid response format', 200, url);
        }

        const data = Array.isArray(result.data) ? result.data : Array.isArray(result) ? result : [];

        // Cache the raw data
        dataCache[collectionName] = {
            data,
            timestamp: Date.now()
        };

        return data;
    } catch (error) { // Enhanced error logging for debugging
        if (error.status === 401) {
            console.error(`Authentication failed for ${collectionName}:`, {
                url,
                error: error.message,
                apiKey: API_CONFIG.API_KEY.substring(0, 10) + '...' // Log partial key for debugging
            });
        } else {
            console.error(`Error fetching ${collectionName}:`, error);
        }

        // Return cached data if available, even if expired
        if (cached) {
            console.warn(`Using expired cache for ${collectionName} due to API error`);
            return cached.data;
        }

        // Try fallback data from local JSON
        console.warn(`API failed for ${collectionName}, trying fallback data...`);
        return getFallbackData(collectionName);
    }
};

// Enhanced data processing with better validation and icon handling
const processData = (data, type) => {
    if (!Array.isArray(data)) {
        console.warn(`Expected array for ${type}, got:`, typeof data);
        return [];
    }

    return data.map((item, index) => {
        if (!item || typeof item !== 'object') {
            console.warn(`Invalid item at index ${index} for ${type}:`, item);
            return {
                id: `${type}-${index}`,
                ...item
            };
        }

        const processedItem = {
            id: item.id || `${type}-${index}`,
            ...item
        };

        // Enhanced icon processing with multiple possible field names
        const iconFields = ['iconName', 'icon', 'iconComponent', 'iconClass'];
        let iconValue = null;

        for (const field of iconFields) {
            if (item[field]) {
                iconValue = item[field];
                break;
            }
        }

        if (iconValue) { // Handle different icon formats
            if (typeof iconValue === 'string') { // Check if it's JSX-like syntax (e.g., "<FaInstagram />")
                if (iconValue.includes('<') && iconValue.includes('/>')) {
                    const match = iconValue.match(/<(\w+)/);
                    if (match) {
                        iconValue = match[1]; // Extract component name
                    }
                }
            }

            processedItem.icon = renderIcon(iconValue);

            // Debug logging for icon processing
            if (process.env.NODE_ENV === 'development') {
                console.log(`Processing icon for ${type}[${index}]:`, {
                    original: item[iconFields.find(f => item[f])],
                    cleaned: iconValue,
                    processed: !! processedItem.icon
                });
            }
        }

        // Add client images
        if (type === 'clients' && item.imageName) {
            const image = clientImages[item.imageName] || clientImages[item.imageName.toLowerCase()];
            if (image) {
                processedItem.image = image;
            } else {
                console.warn(`Client image not found: ${
                    item.imageName
                }`);
                processedItem.image = null;
            }
        }

        // Process project stack icons
        if (type === 'projects') {
            if (item.stack && Array.isArray(item.stack)) {
                processedItem.stack = item.stack.map((stackItem, stackIndex) => {
                    if (!stackItem || typeof stackItem !== 'object') {
                        return {
                            id: `stack-${index}-${stackIndex}`,
                            name: stackItem || 'Unknown',
                            icon: renderIcon('FaQuestionCircle')
                        };
                    }

                    // Process stack item icons
                    let stackIconValue = stackItem.iconName || stackItem.icon;
                    if (typeof stackIconValue === 'string' && stackIconValue.includes('<')) {
                        const match = stackIconValue.match(/<(\w+)/);
                        if (match) {
                            stackIconValue = match[1];
                        }
                    }

                    return {
                        id: stackItem.id || `stack-${index}-${stackIndex}`,
                        ...stackItem,
                        icon: renderIcon(stackIconValue) || renderIcon('FaQuestionCircle')
                    };
                });
            } else {
                processedItem.stack = [];
            }
        }

        // Ensure required fields exist for different types
        switch (type) {
            case 'services': processedItem.title = processedItem.title || 'Untitled Service';
                processedItem.description = processedItem.description || 'No description available';
                break;
            case 'projects': processedItem.title = processedItem.title || 'Untitled Project';
                processedItem.description = processedItem.description || 'No description available';
                processedItem.link = processedItem.link || '#';
                break;
            case 'skills': processedItem.name = processedItem.name || 'Unknown Skill';
                processedItem.level = processedItem.level || 0;
                break;
            case 'socialHandles': processedItem.name = processedItem.name || 'Social Platform';
                processedItem.url = processedItem.url || processedItem.link || '#';
                break;
            case 'whyChooseMe': processedItem.title = processedItem.title || 'Feature';
                processedItem.description = processedItem.description || 'No description available';
                break;
        }

        return processedItem;
    });
};

// Generic function to get data from API with enhanced error handling and fallback
const getData = async (collectionName) => {
    try {
        if (!collectionName || typeof collectionName !== 'string') {
            throw new Error('Invalid collection name');
        }

        const data = await fetchCollectionData(collectionName);
        const processedData = processData(data, collectionName);

        // If no data from API, try fallback
        if (! processedData || processedData.length === 0) {
            console.warn(`No data from API for ${collectionName}, trying fallback...`);
            const fallbackData = getFallbackData(collectionName);
            return processData(fallbackData, collectionName);
        }

        return processedData;
    } catch (error) {
        console.error(`Failed to get data for ${collectionName}:`, error);

        // Try fallback as last resort
        console.warn(`Using fallback data for ${collectionName} due to error`);
        const fallbackData = getFallbackData(collectionName);
        return processData(fallbackData, collectionName);
    }
};

// Export async functions for all collections
export const getTabs = () => getData('tabs');
export const getWhyChooseMe = () => getData('whyChooseMe');
export const getServices = () => getData('services');
export const getSkills = () => getData('skills');
export const getProjects = () => getData('projects');
export const getClients = () => getData('clients');
export const getContactOptions = () => getData('contactOptions');
export const getSocialHandles = () => getData('socialHandles');
export const getFooter = () => getData('footer');
export const getAppData = () => getData('appData');
export const getPdfData = () => getData('pdfData');

// Enhanced hook with better state management and error recovery
export const usePortfolioData = (collectionName, options = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const {
        autoRetry = true,
        maxRetries = 2,
        retryDelay = 2000,
        enableCache = true
    } = options;

    const fetchData = useCallback(async (isRetry = false) => {
        try {
            if (!isRetry) {
                setLoading(true);
                setError(null);
            }

            const startTime = Date.now();
            const result = await getData(collectionName);
            const elapsed = Date.now() - startTime;

            // Minimum loading time for smooth UX (avoid flash)
            const minDelay = isRetry ? 0 : 200;
            const remainingDelay = Math.max(0, minDelay - elapsed);

            setTimeout(() => {
                setData(result);
                setLoading(false);
                setError(null);
                if (isRetry) 
                    setRetryCount(0);
                
            }, remainingDelay);

        } catch (err) {
            console.error(`Error in usePortfolioData for ${collectionName}:`, err);

            if (autoRetry && retryCount < maxRetries && !isRetry) {
                setRetryCount(prev => prev + 1);
                setTimeout(() => {
                    fetchData(true);
                }, retryDelay);
            } else {
                setError(err.message || 'Failed to fetch data');
                setData([]);
                setLoading(false);
            }
        }
    }, [
        collectionName,
        autoRetry,
        maxRetries,
        retryDelay,
        retryCount
    ]);

    useEffect(() => {
        if (collectionName) {
            fetchData();
        }
    }, [collectionName, fetchData]);

    const retry = useCallback(() => {
        setRetryCount(0);
        fetchData();
    }, [fetchData]);

    const memoizedReturn = useMemo(() => ({
        data,
        loading,
        error,
        retry,
        retryCount,
        hasData: data.length > 0
    }), [
        data,
        loading,
        error,
        retry,
        retryCount
    ]);

    return memoizedReturn;
};

// Utility functions
export const clearCache = (collectionName = null) => {
    if (collectionName) {
        delete dataCache[collectionName];
    } else {
        dataCache = {};
    }
    console.log(`Cache cleared for: ${
        collectionName || 'all collections'
    }`);
};

export const getCacheStatus = () => {
    const status = {};
    Object.keys(dataCache).forEach(key => {
        const cached = dataCache[key];
        const age = Date.now() - cached.timestamp;
        status[key] = {
            age: Math.round(age / 1000), // in seconds
            expired: age > CACHE_EXPIRY,
            itemCount: Array.isArray(cached.data) ? cached.data.length : 'N/A'
        };
    });
    return status;
};

// Test API connection function
export const testAPIConnection = async () => {
    const testCollection = 'tabs'; // Use a simple collection for testing
    const url = `${
        API_CONFIG.BASE_URL
    }/${testCollection}?db=${
        API_CONFIG.DATABASE
    }`;

    console.log('Testing API connection...', {
        url,
        apiKey: API_CONFIG.API_KEY.substring(0, 10) + '...'
    });

    try {
        const response = await fetch(url, {
            headers: {
                'x-api-key': API_CONFIG.API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const status = response.status;
        const statusText = response.statusText;

        console.log(`API Response: ${status} ${statusText}`);

        if (response.ok) {
            const data = await response.json();
            console.log('API Connection successful!', {sampleData: data});
            return {success: true, status, data};
        } else {
            console.error('API Connection failed:', {status, statusText});
            return {success: false, status, error: statusText};
        }
    } catch (error) {
        console.error('API Connection error:', error);
        return {success: false, error: error.message};
    }
};

// Debug function to check API key validity
export const debugAPIKey = () => {
    console.log('API Configuration Debug:', {
        baseUrl: API_CONFIG.BASE_URL,
        database: API_CONFIG.DATABASE,
        apiKeyLength: API_CONFIG.API_KEY.length,
        apiKeyStart: API_CONFIG.API_KEY.substring(0, 10),
        apiKeyEnd: API_CONFIG.API_KEY.substring(-10)
    });
};

// Debug function to test icon rendering
export const debugIcons = () => {
    const testIcons = [
        'FaInstagram',
        '<FaInstagram />',
        'FaFacebookSquare',
        '<FaFacebookSquare/>',
        'FaXTwitter',
        'GrUserExpert',
        'IoMdAnalytics',
        'MdOutlineSupportAgent',
        'RiExchange2Fill'
    ];

    console.log('Icon Debug Test:');
    testIcons.forEach(iconName => {
        const processed = renderIcon(iconName);
        console.log(`"${iconName}" -> ${
            processed ? 'SUCCESS' : 'FAILED'
        }`, processed);
    });

    return testIcons.map(iconName => ({
        input: iconName,
        output: renderIcon(iconName),
        success: !! renderIcon(iconName)
    }));
};

// Debug function to test fallback data
export const debugFallbackData = () => {
    console.log('Fallback Data Debug:');
    console.log('Portfolio data available:', !!portfolioData);
    console.log('Collections available:', portfolioData ?. collections ? Object.keys(portfolioData.collections) : 'None');

    if (portfolioData ?. collections) {
        Object.keys(portfolioData.collections).forEach(key => {
            const collection = portfolioData.collections[key];
            console.log(`${key}:`, {
                type: Array.isArray(collection) ? 'array' : typeof collection,
                length: Array.isArray(collection) ? collection.length : 'N/A',
                sample: Array.isArray(collection) && collection.length > 0 ? collection[0] : null
            });
        });
    }

    return {
        available: !!portfolioData,
        collections: portfolioData ?. collections ? Object.keys(portfolioData.collections) : []
    };
};

// Test function to compare API vs fallback data
export const testDataSources = async (collectionName = 'tabs') => {
    console.log(`Testing data sources for: ${collectionName}`);

    // Test API
    let apiData = [];
    try {
        const url = `${
            API_CONFIG.BASE_URL
        }/${collectionName}?db=${
            API_CONFIG.DATABASE
        }`;
        const response = await fetch(url, {
            headers: {
                'x-api-key': API_CONFIG.API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            apiData = result.data || [];
            console.log('API Data:', {
                success: true,
                count: apiData.length,
                sample: apiData[0]
            });
        } else {
            console.log('API Data:', {
                success: false,
                status: response.status
            });
        }
    } catch (error) {
        console.log('API Data:', {
            success: false,
            error: error.message
        });
    }

    // Test Fallback
    const fallbackData = getFallbackData(collectionName);
    console.log('Fallback Data:', {
        success: fallbackData.length > 0,
        count: fallbackData.length,
        sample: fallbackData[0]
    });

    return {
        api: {
            data: apiData,
            success: apiData.length > 0
        },
        fallback: {
            data: fallbackData,
            success: fallbackData.length > 0
        }
    };
};

// Helper function to render icons in your components
export const IconRenderer = ({
    iconName,
    size = 24,
    className = ''
}) => {
    const icon = renderIcon(iconName, size, className);

    if (! icon) {
        return <span className="missing-icon"
            title={
                `Missing icon: ${iconName}`
        }>❓</span>;
    }

    return icon;
};

// Prefetch function for performance optimization
export const prefetchData = async (collectionNames = []) => {
    const promises = collectionNames.map(name => getData(name));
    try {
        await Promise.all(promises);
        console.log('Data prefetched successfully for:', collectionNames);
    } catch (error) {
        console.warn('Some data failed to prefetch:', error);
    }
};

// For backward compatibility - these will return promises
export const tabs = getTabs();
export const whyChooseMe = getWhyChooseMe();
export const services = getServices();
export const skills = getSkills();
export const projects = getProjects();
export const clients = getClients();
export const contactOptions = getContactOptions();
export const socialHandles = getSocialHandles();
export const footer = getFooter();
export const appData = getAppData();
export const pdfData = getPdfData();

// Default export for the main data manager
export default {
    getData,
    usePortfolioData,
    clearCache,
    getCacheStatus,
    prefetchData,
    renderIcon
};
