<?php

namespace App\Http\Helper\Product;

class GetUniqueAttribute
{
    // Hàm để lấy các thuộc tính độc nhất
    public function getUniqueAttributes($variants)
    {
        $uniqueAttributes = [];

        foreach ($variants as $variant) {
            foreach ($variant['attributes'] as $attribute) {
                $attrName = $attribute['name'];
                $attrValue = $attribute['pivot']['value'];
                if (!isset($uniqueAttributes[$attrName])) {
                    $uniqueAttributes[$attrName] = [];
                }

                if (!in_array($attrValue, $uniqueAttributes[$attrName])) {
                    $uniqueAttributes[$attrName][$attribute['pivot']['attribute_item_id']] =  $attrValue;
                }
            }
        }
        return $uniqueAttributes;
    }
}
