#!/bin/bash

# Get all province codes
PROVINCE_CODES=$(mysql -u nelgie -pValentines_1906 portfolio -e "SELECT province_code FROM provinces;" | tail -n +2)

# Process each province
for code in $PROVINCE_CODES; do
    echo "Processing province: $code"
    php artisan db:seed --class=BarangayByProvinceSeeder --provinceCode=$code
    
    # Check if the command was successful
    if [ $? -eq 0 ]; then
        echo "Successfully processed province: $code"
    else
        echo "Failed to process province: $code"
    fi
    
    # Wait 5 seconds before processing the next province
    sleep 5
done

echo "Finished processing all provinces"