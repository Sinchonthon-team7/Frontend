// src/data/isscam.js
export const isScamData = [
  {
    id: 1,
    title: '신천지로 의심되는 동아리장이…',
    author: '룰루',
    category: '보이스피싱',
    createdAt: Date.now() - 10 * 60 * 1000, // 10분 전
    views: 200,
    likes: 37,
  },
  {
    id: 2,
    title: '카톡 고객센터 사칭 링크 주의',
    author: 'yunseo',
    category: '사칭',
    createdAt: Date.now() - 2 * 60 * 60 * 1000, // 2시간 전
    views: 124,
    likes: 12,
  },
  {
    id: 3,
    title: '택배 미배송 환불 문자 피싱',
    author: 'guest01',
    category: '피싱',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3일 전
    views: 534,
    likes: 88,
  },
];
