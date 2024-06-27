import { useAppSelector } from "@/hooks/app-hooks"
import AddProductModal from "@/components/modals/AddProductModal"

export default function Modals() {
    const isProductModalVisible = useAppSelector(state => state.global.isProductModalVisible)

    return (
        <>
            <AddProductModal isOpen={isProductModalVisible} />
        </>
    )
}