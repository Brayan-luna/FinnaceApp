import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { Children, useCallback, useMemo, useRef } from "react";
import { Text, View } from "react-native"
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { styles } from "./styles";
import { TransactionItem, TransactionType } from "../TransactionItem";

export function BottonSheet({ children }: { children: React.ReactNode }) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const snapPoints = useMemo(() => ["20%", "30%", "50%"], []);

    const handleSheetChange = useCallback((index: number) => {
        // console.log("handleSheetChange", index);
    }, []);

    const handleSnapPress = useCallback((index: number) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    return (
        <BottomSheet
            style={{
                marginHorizontal: 10,
            }}
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            onChange={handleSheetChange}
            backgroundStyle={styles.backgroundStyle}
        >
            <ScrollView>
                {children}
            </ScrollView>
        </BottomSheet>
    );
}