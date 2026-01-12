import { ZapIcon } from "lucide-react"

const RateLimitUI = () => {
  return (
    <div className="w-full animate-fade-in mb-8">
      <div className="glass-panel rounded-xl p-4 border-l-4 border-l-primary flex items-start gap-4">
        <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
            <ZapIcon className="size-6 text-primary"/>
        </div>
        <div className="flex-1">
            <h3 className="font-bold text-base-content mb-1">Rate Limit Reached</h3>
            <p className="text-base-content/70 text-sm">
                You've made too many requests in a short period. Please take a breath and try again in a minute.
            </p>
        </div>
      </div>
    </div>
  )
}

export default RateLimitUI