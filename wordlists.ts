namespace WordLists {
    //% fixedInstance
    export let EmptyFilter: Bloom = new Bloom(null)
    
    //% block
    export function isWordInFilter(filter: Bloom, word: string): boolean {
        return filter.findWord(word)
    }
}
