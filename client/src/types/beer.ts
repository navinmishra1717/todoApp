export interface Beer {
    name: string;
    image_url: string;
    tagline: string;
    description: string;
}

export interface BeerFormValue {
    name?: string;
    tagline?: string;
    description?: string;
}

export interface AddBeerDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
}
