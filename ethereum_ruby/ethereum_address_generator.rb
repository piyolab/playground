require 'openssl'
require 'base16'
require 'digest/sha3'

def eth_address(public_key)
	s = public_key[2, 128]
	s.downcase!
	s = Base16.decode16(s)
	h = Digest::SHA3.hexdigest(s, 256)
	a = '0x' + h[-40..-1]
	return a
end

ec = OpenSSL::PKey::EC.new('secp256k1')
ec.generate_key

public_key = ec.public_key.to_bn.to_s(16)
private_key = ec.private_key.to_s(16)
eth_address = eth_address(public_key)

puts "address: #{eth_address}"
puts "private_key: #{private_key}"
