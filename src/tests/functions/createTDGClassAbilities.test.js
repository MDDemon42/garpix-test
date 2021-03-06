import createTDGClassAbilities from '../../components/TDG/functions/more/createTDGClassAbilities';

test('testing createTDGClassAbilities()', () => {
    const data = [
        'melee_basic', 'melee_advanced', 
        'armor_basic', 'armor_advanced',
        'range_basic', 'range_advanced',
        'flight_basic',
        'special_basic', 'special_advanced'
    ];

    expect(createTDGClassAbilities(...data)).toEqual({
        melee: {
            title: 'Melee',
            basic: 'melee_basic',
            advanced: 'melee_advanced'
        },
        armor: {
            title: 'Armor',
            basic: 'armor_basic',
            advanced: 'armor_advanced'
        },
        range: {
            title: 'Range',
            basic: 'range_basic',
            advanced: 'range_advanced'
        },
        flight: {
            title: 'Flight',
            basic: 'flight_basic',
            advanced: null
        },
        special: {
            title: 'Special',
            basic: 'special_basic',
            advanced: 'special_advanced'
        }
    });
});