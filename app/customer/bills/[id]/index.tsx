import Info from '@/components/page/customer/bills/info';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function BillScreen() {
    const { id } = useLocalSearchParams()
    return (
        <Info id={id as string} />
    );
}