import BottomSheet from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { styles } from "./styles";

interface BottonSheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
  index?: number;
  onClose?: () => void;
}

export const BottonSheet = forwardRef<BottomSheet, BottonSheetProps>(
  ({ children, snapPoints, index = -1, onClose }, ref) => {
    const defaultSnapPoints = useMemo(() => ["20%", "30%", "70%"], []);
    const resolvedSnapPoints = snapPoints || defaultSnapPoints;

    return (
      <BottomSheet
        style={{
          marginTop: 10,
        }}
        ref={ref}
        index={index}
        snapPoints={resolvedSnapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        onClose={onClose}
        backgroundStyle={styles.backgroundStyle}
        handleIndicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
      >
        {children}
      </BottomSheet>
    );
  }
);