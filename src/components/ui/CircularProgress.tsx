import React from 'react';

interface CircularProgressProps {
  current: number; // 현재 진행 값
  total: number; // 총 진행 값
  size?: number; // 원 크기 (기본값: 40)
  strokeWidth?: number; // 선 두께 (기본값: 4)
  trackColor?: string; // 배경 트랙 색상 (기본값: 회색)
  progressColor?: string; // 진행 상태 색상 (기본값: 초록색)
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  current,
  total,
  size = 34,
  strokeWidth = 4,
  trackColor = '#e0e0e0',
  progressColor = '#3ddc85',
}) => {
  const radius = (size - strokeWidth) / 2; // 반지름
  const circumference = 2 * Math.PI * radius; // 원 둘레
  const percent = (current / total) * 100; // 진행률
  const strokeDashoffset = circumference - (circumference * percent) / 100; // 진행률에 따른 offset

  return (
    <div className='flex items-center gap-2'>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 배경 트랙 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* 진행 상태 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // 진행 시작 위치를 위쪽으로 이동
        />
      </svg>
      <span className='text-sm text-gray-700'>
        {current === total
          ? `${current}/${total} 완료`
          : `${current}/${total} 올리는 중`}
      </span>
    </div>
  );
};
