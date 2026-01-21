type Props = {
    type?: string;
    images?: string[];
    value?: unknown;
    functionManager?: { reloadImages?: () => void
    };
}