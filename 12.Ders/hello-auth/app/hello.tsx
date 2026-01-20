// rnfe

import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Hello = () => {
    const { auth } = useAuth();

    const handleLogout = () => {
        supabase.auth.signOut();
    }

    return (
        <View>
            <Text>{auth.session?.user.email}</Text>
            <Button title="Çıkış yap" onPress={handleLogout} />
        </View>
    )
}

export default Hello