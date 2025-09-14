interface CharacterLoadingSkeletonProps {
  showStats: boolean
}

export const CharacterLoadingSkeleton = ({
  showStats
}: CharacterLoadingSkeletonProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl bg-white/90 shadow-lg border border-blue-100 p-3 sm:p-4">
      {showStats ? (
        <>
          {/* 데스크톱 스켈레톤 (lg 이상) */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-1 order-1 flex flex-col gap-3">
              <div className="bg-gray-100 animate-pulse rounded-lg h-[200px]"></div>
              <div className="bg-gray-100 animate-pulse rounded-lg h-[150px]"></div>
            </div>
            <div className="lg:col-span-2 order-3 lg:order-2">
              <div className="bg-gray-100 animate-pulse rounded-lg h-[500px]"></div>
            </div>
            <div className="lg:col-span-1 order-4 lg:order-3">
              <div className="bg-gray-100 animate-pulse rounded-lg h-[500px]"></div>
            </div>
          </div>

          {/* 모바일 스켈레톤 (lg 미만) */}
          <div className="lg:hidden space-y-4">
            <div className="bg-gray-100 animate-pulse rounded-lg h-48"></div>
            <div className="bg-gray-100 animate-pulse rounded-lg h-32"></div>
            <div className="bg-gray-100 animate-pulse rounded-lg h-96"></div>
            <div className="bg-gray-100 animate-pulse rounded-lg h-80"></div>
          </div>
        </>
      ) : (
        <>
          {/* 데스크톱 장비 스켈레톤 */}
          <div className="hidden lg:grid w-full grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 animate-pulse rounded-lg h-[600px]"></div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 15 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 animate-pulse rounded-lg aspect-square"></div>
              ))}
            </div>
          </div>

          {/* 모바일 장비 스켈레톤 */}
          <div className="lg:hidden space-y-4">
            <div className="bg-gray-100 animate-pulse rounded-lg h-96"></div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 15 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 animate-pulse rounded-lg aspect-square"></div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
