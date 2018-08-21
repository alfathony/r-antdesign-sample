export const pathBreadCrumb = [
    {
        key: '1',
        type: 'single',
        icon: 'pie-chart',
        title: 'Beranda',
        url: '/',
        child: null,
    },
    {
        key: 'g1',
        type: 'group',
        icon: null,
        title: 'Others',
        url: null,
        child: [
            {
                key: 'sub1',
                type: 'sub',
                icon: 'global',
                title: 'Parent Menu',
                url: null,
                child: [
                    {
                        key: '2',
                        type: 'single',
                        icon: 'menu-unfold',
                        title: 'Sample',
                        url: '/sample',
                        child: null,
                    },
                ],
            },
        ],
    },
    {
        key: 'g2',
        type: 'group',
        icon: null,
        title: 'PENGATURAN',
        url: null,
        child: [
            {
                key: '25',
                type: 'single',
                icon: 'logout',
                title: 'Keluar',
                url: '/keluar',
                child: null,
            },
        ],
    },
];

export default { pathBreadCrumb };