export function countStatuses(allPostsData: any, statuses: string) {
    return allPostsData?.reduce((counts: any, post: any) => {
        post?.providers?.forEach((provider: any) => {
            if (statuses?.includes(provider.status)) {
                counts[provider.status] = (counts[provider.status] || 0) + 1;
            }
        });
        return counts;
    }, {});
}