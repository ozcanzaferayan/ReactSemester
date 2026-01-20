// rnfe
import { signUpWithEmail } from '@/src/features/auth/signup';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

const Signup = () => {
    // usss
    const [email, setEmail] = useState<string>("ozcanzaferayan@gmail.com")
    const [password, setPassword] = useState<string>("passw0rd!");

    const handleSignup = async () => {
        try {
            const { user, session } = await signUpWithEmail(email, password);
            alert(user?.email + " " + session?.access_token)

        } catch (error) {
            alert(error)
        }
    }
    return (
        <View>
            {/* email */}
            <TextInput value={email} onChangeText={setEmail} placeholder='Email' />
            {/* password */}
            <TextInput value={password} onChangeText={setPassword} placeholder='Password'
                secureTextEntry />
            {/* button */}
            <Button title="Signup" onPress={handleSignup} />
            <Link href={"/"} asChild dismissTo>
                <Button title="Login" />
            </Link>
        </View>
    )
}

export default Signup