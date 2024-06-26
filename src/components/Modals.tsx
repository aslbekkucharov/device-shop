import { useGlobal } from "@/hooks/useGlobal"
import AddProductModal from "@/components/modals/AddProductModal"

export default function Modals() {
    const { isProductModalVisible } = useGlobal()

    return (
        <>
            <AddProductModal isOpen={isProductModalVisible} />
        </>
    )
}