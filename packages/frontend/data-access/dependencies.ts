export type DataAccessDependencies = {
    backendUrl: string;
}

export function toDataAccessDependencies(): DataAccessDependencies {
    return {
        backendUrl: process.env.BACKEND_URL ?? ''
    }
}