const ProductSkeleton = () => {
    return (
        <div className="rounded-2xl border border-green-100 bg-white p-5">
            <div className="h-40 animate-pulse rounded-xl bg-gray-200" />

            <div className="mt-5">
                <div className="h-5 w-3/5 animate-pulse rounded bg-gray-200" />

                <div className="mt-2 h-4 w-2/5 animate-pulse rounded bg-gray-200" />

                <div className="mt-5 flex items-end justify-between">
                    <div>
                        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

                        <div className="mt-2 h-6 w-28 animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="h-8 w-16 animate-pulse rounded-full bg-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default function Loading() {
    return (
        <main className="min-h-screen bg-[#f7faf7]">
            <section className="bg-[#f0f8f1]">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 animate-pulse rounded-2xl bg-gray-200" />

                        <div>
                            <div className="h-9 w-40 animate-pulse rounded bg-gray-200" />

                            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="mb-6">
                        <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="mb-6 flex justify-end">
                        <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <ProductSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}