import Info from '@/components/page/customer/notifications/info';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function NotificationScreen() {
    const { id } = useLocalSearchParams()
    return (
        <Info id={id as string} />
    );
}

const styles = StyleSheet.create({})