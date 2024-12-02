// src/stores/audioSettingsStore.ts
import { create } from 'zustand';

interface Slider {
  id: string;
  value: number;
  min: number;
  max: number;
  label: string;
}

interface AudioSettingsState {
  selectedSpeed: number;
  selectedVoices: string | null;
  sliders: Slider[];
  setSelectedSpeed: (speed: number) => void;
  setSelectedVoices: (voice: string | null) => void;
  setSliders: (id: string, value: number) => void;
}

export const useAudioSettingsStore = create<AudioSettingsState>((set) => ({
  selectedSpeed: 1, // 기본 속도
  selectedVoices: null, // 선택된 보이스 초기값
  sliders: [
    { id: 'pitch', value: 0.0, min: -20.0, max: 20.0, label: '음높이' },
    { id: 'volume', value: 0.0, min: -10.0, max: 10.0, label: '음량' },
  ],
  setSelectedSpeed: (speed) => set({ selectedSpeed: speed }),
  setSelectedVoices: (voice) => set({ selectedVoices: voice }),
  setSliders: (id, value) =>
    set((state) => ({
      sliders: state.sliders.map((slider) =>
        slider.id === id ? { ...slider, value } : slider
      ),
    })),
}));
