namespace WordLists {
    //% fixedInstance
    //% block="Empty Filter" weight=0
    export let zEmptyFilter: Bloom = new Bloom(null)
    
    //% block="is word $word in filter $filter"
    export function isWordInFilter(filter: Bloom, word: string): boolean {
        return filter.findWord(word)
    }
}
