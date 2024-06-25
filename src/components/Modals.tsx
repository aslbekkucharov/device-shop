import { useGlobal } from "@/hooks/useGlobal"
import AddProductModal from "@/components/modals/AddProductModal"

export default function Modals() {
    const { isProductAddModalVisible } = useGlobal()

    return (
        <>
            <AddProductModal isOpen={isProductAddModalVisible} />
        </>
    )
}