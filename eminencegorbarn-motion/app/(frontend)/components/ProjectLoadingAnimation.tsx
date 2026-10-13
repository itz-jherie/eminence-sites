'use client'

interface ProjectLoadingAnimationProps {
  label?: string
  fullScreen?: boolean
}

function XiLogoPaths({ isFilled = false }: { isFilled?: boolean }) {
  return (
    <svg
      viewBox="0 0 57 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full block"
    >
      <path
        d="M56.0601 43.1864C56.4525 38.3145 56.8364 34.4709 56.073 30.4623C55.0724 25.1827 52.1956 21.7989 47.5074 20.3716C44.8247 19.543 41.3052 19.3174 37.32 19.6515C36.2806 14.2634 33.848 9.88608 30.031 6.58902C21.8363 -0.525682 9.81592 -0.204652 5.63229 0.151083C5.56328 0.155421 5.51153 0.216157 5.51153 0.285568V7.10961C5.51153 7.19204 5.58053 7.25277 5.65817 7.2441C8.03895 6.99248 18.8862 6.2116 25.4635 11.9511C27.9565 14.1245 29.5911 17.0485 30.3545 20.71C28.6379 21.0831 26.8739 21.5386 25.0969 22.0765C15.7334 24.8964 7.96994 29.4429 3.80789 34.5403C-0.449059 39.7592 -1.16502 45.7112 1.80233 51.3119C4.59285 56.5915 10.8424 58.8821 17.7001 57.1555C27.6114 54.674 37.6047 44.297 37.8807 26.7098C40.9559 26.4451 43.617 26.5666 45.4759 27.1306C49.7803 28.4494 49.8752 32.5577 49.0557 42.6137C48.5942 48.2187 48.0853 53.4073 49.4741 58.9038C49.487 58.9602 49.5388 59.0036 49.5992 59.0036H56.6854C56.776 59.0036 56.8321 58.9168 56.8019 58.8301C55.0594 54.314 55.5641 49.1731 56.0601 43.1907V43.1864ZM25.8991 43.182C23.2855 46.7828 19.6841 49.3857 16.0137 50.3098C13.1154 51.0299 9.48813 50.813 8.00876 47.9931C6.96933 46.0496 5.98165 43.0129 9.23797 39.0303C13.5682 33.729 22.5609 29.7812 30.8246 27.8594C30.527 33.8462 28.8449 39.0998 25.8991 43.1777V43.182Z"
        fill={isFilled ? "#3BEDFF" : "none"}
        stroke={isFilled ? "#3BEDFF" : "white"}
        strokeWidth={isFilled ? "0.5" : "1.2"}
        strokeOpacity={isFilled ? "1" : "0.35"}
      />
      <path
        d="M50.0046 12.3415C52.863 12.3415 55.1802 10.0108 55.1802 7.13563C55.1802 4.2605 52.863 1.92975 50.0046 1.92975C47.1462 1.92975 44.829 4.2605 44.829 7.13563C44.829 10.0108 47.1462 12.3415 50.0046 12.3415Z"
        fill={isFilled ? "#3BEDFF" : "none"}
        stroke={isFilled ? "#3BEDFF" : "white"}
        strokeWidth={isFilled ? "0.5" : "1.2"}
        strokeOpacity={isFilled ? "1" : "0.35"}
      />
    </svg>
  )
}

export default function ProjectLoadingAnimation({
  label = 'Loading Projects',
  fullScreen = true,
}: ProjectLoadingAnimationProps) {
  return (
    <div
      className={
        fullScreen
          ? 'fixed inset-0 z-[99999] w-screen h-screen bg-[#111111] flex flex-col items-center justify-center select-none overflow-hidden'
          : 'w-full min-h-screen flex flex-col items-center justify-center bg-[#111111] select-none py-24'
      }
    >
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Logo with Wireframe Outline + Left-to-Right Accent Fill */}
        <div className="relative w-16 sm:w-20 md:w-24 aspect-[57/59] flex items-center justify-center">
          {/* Base Layer: Delicate Wireframe Outline */}
          <div className="absolute inset-0">
            <XiLogoPaths isFilled={false} />
          </div>

          {/* Top Layer: Fills with Cyan Accent Color (#3BEDFF) from Left to Right */}
          <div className="absolute inset-0 animate-logo-fill">
            <XiLogoPaths isFilled={true} />
          </div>
        </div>

        {/* Sleek Cyan Shimmer Progress Bar */}
        <div className="w-40 sm:w-52 h-[2px] bg-white/10 rounded-full overflow-hidden mt-10 relative">
          <div className="h-full w-24 bg-gradient-to-r from-transparent via-[#3BEDFF] to-transparent rounded-full animate-shimmer-beam" />
        </div>

        {/* Subtitle / Status Text */}
        <p className="mt-5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#EEEEEE]/60">
          {label}
        </p>
      </div>
    </div>
  )
}
