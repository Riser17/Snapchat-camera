import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const useFirstTimeOpen = () => {
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkFirstTimeOpen() {
            try {
                const hasOpend = await AsyncStorage.getItem('hasOpened');
                if (hasOpend === null) {
                    // first time
                    setIsFirstTime(true);
                } else {
                    setIsFirstTime(false);
                }
            } catch (e) {
                console.log('error getting local first time', e);
                
            } finally {
                setIsLoading(false);
            }
        }
        checkFirstTimeOpen();
    },[]);

  return { isFirstTime, isLoading}
}

export default useFirstTimeOpen