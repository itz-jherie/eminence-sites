import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Background Vector Logo */}
      <div className="absolute right-0 top-[10%] bottom-0 w-full sm:w-3/4 md:w-1/2 opacity-[0.04] pointer-events-none flex justify-end">
        <svg viewBox="0 0 401 414" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto" preserveAspectRatio="xMaxYMid meet">
          <path d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center py-20">
        <p className="text-lightblue text-sm tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'var(--font-marck)', fontSize: '18px' }}>Oops</p>
        <h1 className="text-[#EEEEEE] font-normal mb-6" style={{ fontSize: 'clamp(80px, 18vw, 180px)', lineHeight: '0.9', fontWeight: 400 }}>
          4<span style={{ fontFamily: 'var(--font-marck)' }} className="text-lightblue">0</span>4
        </h1>
        <h2 className="text-white text-2xl md:text-3xl font-normal mb-4">This page vanished into the void.</h2>
        <p className="text-[#a1a1aa] max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontSize: 'clamp(15px, 2vw, 18px)' }}>
          The link you followed may be broken, or the page may have been moved. Let’s get you back to something unforgettable.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="inline-block px-8 py-4 text-[16px] font-normal transition-all hover:scale-105 active:scale-95 border border-white/20 shadow-lg" style={{ backgroundColor: '#3BEDFF', color: '#111111' }}>
            Go Home
          </Link>
          <Link href="/projects" className="inline-block px-8 py-4 text-[16px] font-normal transition-all hover:scale-105 active:scale-95 bg-[#1D1D1D] text-[#EEEEEE] hover:bg-[#2a2a2a] border border-white/20 shadow-lg">
            View Projects
          </Link>
        </div>
      </div>
    </div>
  )
}
