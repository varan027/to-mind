import { ZapIcon } from "lucide-react"

const RateLimitUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 bg-primary/20 p-2 rounded-full mr-4 border border-primary">
            <ZapIcon className="size-7 text-primary"/>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-primary mb-1 text-sm md:text-normal">Rate Limit Reached</h3>
            <p className="text-base-content/70 text-xs md:text-sm">You've made too many requests in a short period. Please wait a moment and Try again.</p>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default RateLimitUI