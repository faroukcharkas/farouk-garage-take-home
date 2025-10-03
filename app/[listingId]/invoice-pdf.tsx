import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { InvoiceData } from '@/lib/types';

interface InvoicePDFProps {
    invoiceData: InvoiceData;
    customerName: string;
    invoiceNumber: string;
    invoiceDate: string;
}

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    header: {
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    logo: {
        width: 40,
        height: 40,
    },
    logoText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    invoiceTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    invoiceInfo: {
        fontSize: 10,
        color: '#6B7280',
        marginBottom: 4,
    },
    billTo: {
        textAlign: 'right',
    },
    billToLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    billToName: {
        fontSize: 12,
        color: '#6B7280',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginVertical: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    itemDetailsRow: {
        flexDirection: 'row',
        gap: 20,
    },
    itemImage: {
        width: 180,
        height: 180,
        borderRadius: 8,
        objectFit: 'cover',
    },
    itemTextContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemDescription: {
        fontSize: 10,
        color: '#6B7280',
        lineHeight: 1.5,
    },
    pricingRow: {
        flexDirection: 'row',
        gap: 30,
        marginTop: 8,
        marginBottom: 8,
    },
    pricingSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginVertical: 8,
    },
    pricingItem: {
        flexDirection: 'column',
    },
    pricingLabel: {
        fontSize: 9,
        color: '#6B7280',
        marginBottom: 4,
    },
    pricingValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    totalsSection: {
        marginTop: 20,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        fontSize: 14,
    },
    totalLabel: {
        color: '#6B7280',
    },
    totalAmount: {
        fontWeight: 'normal',
    },
    grandTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#6B7280',
    },
    footerText: {
        marginBottom: 8,
    },
});

export function InvoicePDF({ invoiceData, customerName, invoiceNumber, invoiceDate }: InvoicePDFProps) {
    // Format price for PDF (since .toLocaleString may not work in react-pdf)
    const formatPrice = (price: number) =>
        `$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.logoRow}>
                        <Text style={styles.logoText}>Garage Technologies, Inc.</Text>
                    </View>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.invoiceTitle}>INVOICE</Text>
                            <Text style={styles.invoiceInfo}>Invoice #: {invoiceNumber}</Text>
                            <Text style={styles.invoiceInfo}>Date: {invoiceDate}</Text>
                        </View>
                        <View style={styles.billTo}>
                            <Text style={styles.billToLabel}>Bill To:</Text>
                            <Text style={styles.billToName}>{customerName}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.separator} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Item Details</Text>
                    <View style={styles.itemDetailsRow}>
                        {invoiceData.imageUrl && (
                            <Image
                                src={invoiceData.imageUrl}
                                style={styles.itemImage}
                            />
                        )}
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemTitle}>{invoiceData.listingTitle}</Text>
                            <View style={styles.pricingRow}>
                                <View style={styles.pricingItem}>
                                    <Text style={styles.pricingLabel}>Unit Price</Text>
                                    <Text style={styles.pricingValue}>{formatPrice(invoiceData.unitPrice)}</Text>
                                </View>
                                <View style={styles.pricingItem}>
                                    <Text style={styles.pricingLabel}>Quantity</Text>
                                    <Text style={styles.pricingValue}>{invoiceData.quantity}</Text>
                                </View>
                            </View>
                            <View style={styles.pricingSeparator} />
                            <Text style={styles.itemDescription}>
                                {invoiceData.listingDescription}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.separator} />

                <View style={styles.totalsSection}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Subtotal:</Text>
                        <Text style={styles.totalAmount}>
                            {formatPrice(invoiceData.sellingPrice)}
                        </Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Tax (0%):</Text>
                        <Text style={styles.totalAmount}>$0.00</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.grandTotalRow}>
                        <Text>Total:</Text>
                        <Text>
                            {formatPrice(invoiceData.sellingPrice)}
                        </Text>
                    </View>
                </View>

                <View style={styles.separator} />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Thank you for your business!</Text>
                    <Text>Call us at (201) 293-7164 or email us at support@shopgarage.com for help.</Text>
                </View>
            </Page>
        </Document>
    );
}
