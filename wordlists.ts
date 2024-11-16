namespace WordLists {
    //% fixedInstance
    //% block="Empty Filter" weight=0
    export let zEmptyFilter: Bloom = new Bloom(null)
    
    //% block
    export function isWordInFilter(filter: Bloom, word: string): boolean {
        return filter.findWord(word)
    }
}
