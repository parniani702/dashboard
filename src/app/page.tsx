import { Button } from '@/components/ui/button'
import { Mail, SendHorizonal } from 'lucide-react'
import Link from 'next/link'

export default function page() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">شروع به ساخت حساب</h2>

                    <form
                        action=""
                        className="mx-auto mt-10 max-w-sm lg:mt-12">
                        <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">


                            <input
                                placeholder="ایمیل خود را وارد کنید"
                                className="h-14 w-full bg-transparent pl-12 focus:outline-none"
                                type="email"
                            />

                            <div className="md:pr-1.5 lg:pr-0">
                                <Button
                                    aria-label="submit"
                                    className="rounded-(--radius)">
                                    <Link href="/dashboard" className="hidden md:block">شروع کنید</Link>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}