"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateResponse = paginateResponse;
function paginateResponse({ records, total, page, limit, }) {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    return {
        records,
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
    };
}
