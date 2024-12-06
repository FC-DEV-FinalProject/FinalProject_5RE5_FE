import styles from './textSlide.module.css';

const TextSlide = () => {
  return (
    <>
      <div
        className={`mt-[240px] h-[85px] overflow-hidden ${styles.textSlideAnimation}`}
      >
        <p className='text-[50px] font-bold text-blue-7'>내가 적은 시나리오</p>
        <p className='text-[50px] font-bold text-blue-7'>
          10개의 보이스 파일로
        </p>
        <p className='text-[50px] font-bold text-blue-7'>로마 신화 대본으로</p>
        <p className='text-[50px] font-bold text-blue-7'>
          내 목소리를 다른 보이스 톤으로
        </p>
        <p className='text-[50px] font-bold text-blue-7'>내가 적은 시나리오</p>
      </div>

      <p className='text-[50px] text-blue-7'>AI 오디오 생성해줘</p>
    </>
  );
};

export default TextSlide;
